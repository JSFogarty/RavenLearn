import type { ChartAnalysis } from "@/lib/analysis/rules";
import type { Candle } from "@/lib/market-data/types";

export type CoachSectionId =
  | "coach-current-read"
  | "coach-trend"
  | "coach-volume"
  | "coach-levels"
  | "coach-pattern"
  | "coach-moving-averages"
  | "coach-wyckoff"
  | "coach-confirmation"
  | "coach-beginner";

export type CoachSection = {
  id: CoachSectionId;
  title: string;
  text: string;
};

export type CoachExplanation = {
  source: "openai" | "rules";
  status: "ready" | "fallback";
  model?: string;
  createdAt: string;
  sections: CoachSection[];
  warning?: string;
};

type CoachRequest = {
  symbol: string;
  timeframe: string;
  candles: Candle[];
  analysis: ChartAnalysis;
};

type OpenAIResponse = {
  output_text?: string;
  output?: Array<{
    content?: Array<{
      text?: string;
    }>;
  }>;
};

const cache = new Map<string, CoachExplanation>();

const sectionSchema = {
  type: "object",
  additionalProperties: false,
  required: ["sections"],
  properties: {
    sections: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["id", "title", "text"],
        properties: {
          id: {
            type: "string",
            enum: [
              "coach-current-read",
              "coach-trend",
              "coach-volume",
              "coach-levels",
              "coach-pattern",
              "coach-moving-averages",
              "coach-wyckoff",
              "coach-confirmation",
              "coach-beginner",
            ],
          },
          title: { type: "string" },
          text: { type: "string" },
        },
      },
    },
  },
};

function getFallbackSections(analysis: ChartAnalysis): CoachSection[] {
  return [
    {
      id: "coach-current-read",
      title: "Current Read",
      text: `${analysis.trend.direction}: ${analysis.trend.reason}`,
    },
    {
      id: "coach-trend",
      title: "Trend",
      text: analysis.trend.reason,
    },
    {
      id: "coach-volume",
      title: "Volume",
      text: analysis.volume.reason,
    },
    {
      id: "coach-levels",
      title: "Key Levels",
      text: analysis.levels.reason,
    },
    {
      id: "coach-pattern",
      title: "Pattern Candidate",
      text: analysis.patterns.reason,
    },
    {
      id: "coach-moving-averages",
      title: "Moving Averages",
      text: analysis.movingAverages.reason,
    },
    {
      id: "coach-wyckoff",
      title: "Wyckoff Read",
      text: `${analysis.wyckoff.reason} ${analysis.wyckoff.confirmation} ${analysis.wyckoff.invalidation}`,
    },
    {
      id: "coach-confirmation",
      title: "Confirmation / Invalidation",
      text: "Confirmation would require price and volume to support the current read. Invalidation would come from price moving back through the highlighted level or failing to hold the nearby support area.",
    },
    {
      id: "coach-beginner",
      title: "Beginner Explanation",
      text: "The chart is being read by comparing recent price structure, volume, support and resistance, and moving averages. These are educational clues, not trade instructions.",
    },
  ];
}

function extractOutputText(response: OpenAIResponse) {
  if (response.output_text) {
    return response.output_text;
  }

  return response.output?.flatMap((item) => item.content ?? []).map((content) => content.text).filter(Boolean).join("\n");
}

function parseSections(text?: string): CoachSection[] | undefined {
  if (!text) {
    return undefined;
  }

  try {
    const parsed = JSON.parse(text) as { sections?: CoachSection[] };

    if (!Array.isArray(parsed.sections) || parsed.sections.length === 0) {
      return undefined;
    }

    return parsed.sections;
  } catch {
    return undefined;
  }
}

function hasDirectAdviceLanguage(sections: CoachSection[]) {
  const combined = sections.map((section) => section.text.toLowerCase()).join(" ");
  const blockedTerms = ["you should buy", "you should sell", "buy now", "sell now", "guaranteed", "risk-free"];

  return blockedTerms.some((term) => combined.includes(term));
}

function buildCacheKey(request: CoachRequest) {
  const latest = request.candles.at(-1);

  return [
    request.symbol,
    request.timeframe,
    latest?.timestamp,
    latest?.close,
    request.analysis.patterns.candidates.join("|"),
  ].join(":");
}

export function getRuleBasedCoachExplanation(analysis: ChartAnalysis): CoachExplanation {
  return {
    source: "rules",
    status: "fallback",
    createdAt: new Date().toISOString(),
    sections: getFallbackSections(analysis),
  };
}

export async function getOpenAICoachExplanation(request: CoachRequest): Promise<CoachExplanation> {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL ?? "gpt-5.2";
  const fallback = getRuleBasedCoachExplanation(request.analysis);

  if (!apiKey) {
    return {
      ...fallback,
      warning: "OpenAI API key is not configured, so the rule-based coach is shown.",
    };
  }

  const cacheKey = buildCacheKey(request);
  const cached = cache.get(cacheKey);

  if (cached) {
    return cached;
  }

  const visibleCandles = request.candles.slice(-30).map((candle) => ({
    timestamp: candle.timestamp,
    open: candle.open,
    high: candle.high,
    low: candle.low,
    close: candle.close,
    volume: candle.volume,
    vwap: candle.vwap,
  }));

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        instructions:
          "You are Raven Learn's educational chart coach. Explain only the structured chart facts provided by the app. Do not invent facts, prices, candles, news, fundamentals, or trade recommendations. Use cautious language and avoid direct financial advice.",
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: JSON.stringify({
                  task: "Explain this chart analysis in plain English for a beginner.",
                  requiredSections: [
                    "Current Read",
                    "Trend",
                    "Volume",
                    "Key Levels",
                    "Pattern Candidate",
                    "Moving Averages",
                    "Wyckoff Read",
                    "Confirmation / Invalidation",
                    "Beginner Explanation",
                  ],
                  symbol: request.symbol,
                  timeframe: request.timeframe,
                  visibleCandles,
                  analysis: request.analysis,
                }),
              },
            ],
          },
        ],
        reasoning: { effort: "low" },
        text: {
          verbosity: "low",
          format: {
            type: "json_schema",
            name: "raven_chart_coach",
            strict: true,
            schema: sectionSchema,
          },
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI request failed with HTTP ${response.status}`);
    }

    const data = (await response.json()) as OpenAIResponse;
    const sections = parseSections(extractOutputText(data));

    if (!sections || hasDirectAdviceLanguage(sections)) {
      throw new Error("OpenAI explanation did not pass guardrail checks");
    }

    const explanation: CoachExplanation = {
      source: "openai",
      status: "ready",
      model,
      createdAt: new Date().toISOString(),
      sections,
    };

    cache.set(cacheKey, explanation);

    return explanation;
  } catch (error) {
    const message = error instanceof Error ? error.message : "OpenAI explanation unavailable";

    return {
      ...fallback,
      warning: `${message}. Showing the rule-based coach instead.`,
    };
  }
}
