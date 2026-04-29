import type { Candle } from "@/lib/market-data/types";

export type TrendDirection = "uptrend" | "downtrend" | "range";

export type ChartAnnotationKind =
  | "support"
  | "resistance"
  | "breakout"
  | "pullback"
  | "volume"
  | "moving-average"
  | "structure"
  | "wyckoff";

export type ChartAnnotation = {
  id: string;
  kind: ChartAnnotationKind;
  label: string;
  sectionId: string;
  timestamp?: number;
  price?: number;
  priceMin?: number;
  priceMax?: number;
  tone: "green" | "blue" | "amber" | "purple" | "red";
};

export type ChartAnalysis = {
  symbol: string;
  trend: {
    direction: TrendDirection;
    reason: string;
  };
  structure: {
    higherHigh: boolean;
    higherLow: boolean;
    lowerHigh: boolean;
    lowerLow: boolean;
    reason: string;
  };
  levels: {
    support?: number;
    resistance?: number;
    reason: string;
  };
  volume: {
    averageVolume: number;
    latestVolume: number;
    spike: boolean;
    reason: string;
  };
  movingAverages: {
    ma20?: number;
    ma50?: number;
    ma200?: number;
    priceAboveMa20?: boolean;
    priceAboveMa50?: boolean;
    priceAboveMa200?: boolean;
    reclaimOrLoss?: string;
    reason: string;
  };
  patterns: {
    consolidation: boolean;
    breakoutAttempt: boolean;
    pullback: boolean;
    candidates: string[];
    reason: string;
  };
  wyckoff: {
    rangeCandidate: boolean;
    bias?: "possible accumulation" | "possible distribution";
    event?: "spring candidate" | "upthrust candidate" | "test candidate" | "sign of strength candidate" | "sign of weakness candidate";
    rangeHigh?: number;
    rangeLow?: number;
    reason: string;
    confirmation: string;
    invalidation: string;
    beginnerExplanation: string;
  };
  annotations: ChartAnnotation[];
};

function average(values: number[]) {
  if (values.length === 0) {
    return undefined;
  }

  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function movingAverage(candles: Candle[], windowSize: number) {
  return average(candles.slice(-windowSize).map((candle) => candle.close));
}

function recentRange(candles: Candle[], windowSize: number) {
  const window = candles.slice(-windowSize);

  if (window.length === 0) {
    return undefined;
  }

  return {
    high: Math.max(...window.map((candle) => candle.high)),
    low: Math.min(...window.map((candle) => candle.low)),
  };
}

function format(value?: number) {
  return typeof value === "number" ? value.toFixed(2) : "n/a";
}

function priceZone(price: number, chartRange: number) {
  const padding = Math.max(chartRange * 0.01, price * 0.002);

  return {
    priceMin: price - padding,
    priceMax: price + padding,
  };
}

export function analyzeChart(symbol: string, candles: Candle[]): ChartAnalysis {
  const latest = candles.at(-1);
  const previous = candles.at(-2);
  const priorWindow = candles.slice(-12, -2);
  const closeFiveBack = candles.at(-6)?.close;
  const supportWindow = recentRange(candles, 10);
  const wyckoffWindow = recentRange(candles, 20);
  const priorResistance = priorWindow.length > 0 ? Math.max(...priorWindow.map((candle) => candle.high)) : undefined;
  const priorSupport = priorWindow.length > 0 ? Math.min(...priorWindow.map((candle) => candle.low)) : undefined;
  const ma20 = movingAverage(candles, 20);
  const ma50 = movingAverage(candles, 50);
  const ma200 = movingAverage(candles, 200);
  const recentVolumes = candles.slice(-11, -1).map((candle) => candle.volume);
  const averageVolume = average(recentVolumes) ?? latest?.volume ?? 0;
  const latestVolume = latest?.volume ?? 0;
  const volumeSpike = averageVolume > 0 && latestVolume >= averageVolume * 1.5;
  const latestClose = latest?.close ?? 0;
  const previousClose = previous?.close ?? latestClose;
  const higherHigh = typeof priorResistance === "number" && typeof latest?.high === "number" && latest.high > priorResistance;
  const higherLow = typeof priorSupport === "number" && typeof latest?.low === "number" && latest.low > priorSupport;
  const lowerHigh = typeof priorResistance === "number" && typeof latest?.high === "number" && latest.high < priorResistance;
  const lowerLow = typeof priorSupport === "number" && typeof latest?.low === "number" && latest.low < priorSupport;
  const priceAboveMa20 = typeof ma20 === "number" ? latestClose >= ma20 : undefined;
  const priceAboveMa50 = typeof ma50 === "number" ? latestClose >= ma50 : undefined;
  const priceAboveMa200 = typeof ma200 === "number" ? latestClose >= ma200 : undefined;
  const priorRange = priorResistance && priorSupport ? priorResistance - priorSupport : undefined;
  const chartRange = supportWindow ? Math.max(supportWindow.high - supportWindow.low, latestClose * 0.01, 1) : Math.max(latestClose * 0.01, 1);
  const consolidation = Boolean(priorRange && priorSupport && priorRange / priorSupport <= 0.08);
  const breakoutAttempt = Boolean(priorResistance && latestClose > priorResistance && latestClose >= previousClose);
  const pullback = Boolean(closeFiveBack && latestClose < closeFiveBack && priceAboveMa50 !== false);
  const closeTwentyBack = candles.at(-21)?.close;
  const rangeWidth = wyckoffWindow ? wyckoffWindow.high - wyckoffWindow.low : undefined;
  const rangePercent = rangeWidth && wyckoffWindow ? rangeWidth / Math.max(wyckoffWindow.low, 1) : undefined;
  const priorMovePercent = closeTwentyBack ? (latestClose - closeTwentyBack) / closeTwentyBack : undefined;
  const rangeCandidate = Boolean(rangePercent && rangePercent <= 0.16 && Math.abs(priorMovePercent ?? 0) >= 0.04);
  const wyckoffBias =
    rangeCandidate && typeof priorMovePercent === "number"
      ? priorMovePercent >= 0
        ? "possible distribution"
        : "possible accumulation"
      : undefined;
  const springCandidate = Boolean(
    rangeCandidate &&
      wyckoffWindow &&
      latest &&
      latest.low <= wyckoffWindow.low * 1.01 &&
      latest.close > latest.low &&
      latest.close >= wyckoffWindow.low,
  );
  const upthrustCandidate = Boolean(
    rangeCandidate &&
      wyckoffWindow &&
      latest &&
      latest.high >= wyckoffWindow.high * 0.99 &&
      latest.close < latest.high &&
      latest.close <= wyckoffWindow.high,
  );
  const testCandidate = Boolean(rangeCandidate && wyckoffWindow && latest && latest.low > wyckoffWindow.low && latest.close > latest.open && !volumeSpike);
  const signOfStrengthCandidate = Boolean(rangeCandidate && wyckoffWindow && latestClose > wyckoffWindow.high && volumeSpike);
  const signOfWeaknessCandidate = Boolean(rangeCandidate && wyckoffWindow && latestClose < wyckoffWindow.low && volumeSpike);
  const wyckoffEvent = signOfStrengthCandidate
    ? "sign of strength candidate"
    : signOfWeaknessCandidate
      ? "sign of weakness candidate"
      : springCandidate
        ? "spring candidate"
        : upthrustCandidate
          ? "upthrust candidate"
          : testCandidate
            ? "test candidate"
            : undefined;
  const trendDirection: TrendDirection =
    priceAboveMa20 && priceAboveMa50 && latestClose > (closeFiveBack ?? latestClose)
      ? "uptrend"
      : priceAboveMa20 === false && priceAboveMa50 === false
        ? "downtrend"
        : "range";
  const reclaimOrLoss =
    typeof ma20 === "number" && previous
      ? previous.close < ma20 && latestClose >= ma20
        ? "20 MA reclaim candidate"
        : previous.close > ma20 && latestClose <= ma20
          ? "20 MA loss candidate"
          : undefined
      : undefined;
  const candidates = [
    breakoutAttempt ? "Possible breakout attempt" : undefined,
    pullback ? "Pullback candidate" : undefined,
    consolidation ? "Range/consolidation" : undefined,
    volumeSpike ? "Volume spike" : undefined,
    reclaimOrLoss,
  ].filter((candidate): candidate is string => Boolean(candidate));
  const annotations: ChartAnnotation[] = [];

  if (typeof supportWindow?.low === "number") {
    annotations.push({
      id: "support-zone",
      kind: "support",
      label: "Possible support zone",
      sectionId: "coach-levels",
      tone: "blue",
      ...priceZone(supportWindow.low, chartRange),
    });
  }

  if (typeof supportWindow?.high === "number") {
    annotations.push({
      id: "resistance-zone",
      kind: "resistance",
      label: "Possible resistance zone",
      sectionId: "coach-levels",
      tone: "green",
      ...priceZone(supportWindow.high, chartRange),
    });
  }

  if (latest && breakoutAttempt && typeof priorResistance === "number") {
    annotations.push({
      id: "breakout-attempt",
      kind: "breakout",
      label: "Possible breakout attempt",
      sectionId: "coach-pattern",
      timestamp: latest.timestamp,
      price: priorResistance,
      tone: "green",
    });
  }

  if (latest && pullback) {
    annotations.push({
      id: "pullback-candidate",
      kind: "pullback",
      label: "Pullback candidate",
      sectionId: "coach-pattern",
      timestamp: latest.timestamp,
      price: latest.low,
      tone: "amber",
    });
  }

  if (latest && volumeSpike) {
    annotations.push({
      id: "volume-spike",
      kind: "volume",
      label: "Volume spike",
      sectionId: "coach-volume",
      timestamp: latest.timestamp,
      price: latest.high,
      tone: "purple",
    });
  }

  if (latest && reclaimOrLoss && typeof ma20 === "number") {
    annotations.push({
      id: "ma20-reclaim-loss",
      kind: "moving-average",
      label: reclaimOrLoss,
      sectionId: "coach-moving-averages",
      timestamp: latest.timestamp,
      price: ma20,
      tone: reclaimOrLoss.includes("loss") ? "red" : "green",
    });
  }

  if (latest && higherHigh) {
    annotations.push({
      id: "higher-high",
      kind: "structure",
      label: "Possible higher high",
      sectionId: "coach-trend",
      timestamp: latest.timestamp,
      price: latest.high,
      tone: "green",
    });
  } else if (latest && higherLow) {
    annotations.push({
      id: "higher-low",
      kind: "structure",
      label: "Possible higher low",
      sectionId: "coach-trend",
      timestamp: latest.timestamp,
      price: latest.low,
      tone: "blue",
    });
  } else if (latest && lowerLow) {
    annotations.push({
      id: "lower-low",
      kind: "structure",
      label: "Possible lower low",
      sectionId: "coach-trend",
      timestamp: latest.timestamp,
      price: latest.low,
      tone: "red",
    });
  } else if (latest && lowerHigh) {
    annotations.push({
      id: "lower-high",
      kind: "structure",
      label: "Possible lower high",
      sectionId: "coach-trend",
      timestamp: latest.timestamp,
      price: latest.high,
      tone: "amber",
    });
  }

  if (rangeCandidate && wyckoffWindow) {
    annotations.push({
      id: "wyckoff-range",
      kind: "wyckoff",
      label: "Possible Wyckoff range",
      sectionId: "coach-wyckoff",
      tone: wyckoffBias === "possible accumulation" ? "blue" : "amber",
      priceMin: wyckoffWindow.low,
      priceMax: wyckoffWindow.high,
    });
  }

  if (latest && wyckoffEvent) {
    annotations.push({
      id: "wyckoff-event",
      kind: "wyckoff",
      label: wyckoffEvent,
      sectionId: "coach-wyckoff",
      timestamp: latest.timestamp,
      price: wyckoffEvent.includes("weakness") || wyckoffEvent.includes("spring") ? latest.low : latest.high,
      tone: wyckoffEvent.includes("weakness") || wyckoffEvent.includes("upthrust") ? "red" : "green",
    });
  }

  return {
    symbol,
    trend: {
      direction: trendDirection,
      reason:
        trendDirection === "uptrend"
          ? "Latest price is above short and medium moving averages with constructive recent closes."
          : trendDirection === "downtrend"
            ? "Latest price is below short and medium moving averages."
            : "Moving-average and recent-close evidence is mixed, so the chart reads more like a range.",
    },
    structure: {
      higherHigh,
      higherLow,
      lowerHigh,
      lowerLow,
      reason: `Latest high ${higherHigh ? "cleared" : "did not clear"} recent resistance; latest low ${higherLow ? "held above" : lowerLow ? "broke below" : "is near"} recent support.`,
    },
    levels: {
      support: supportWindow?.low,
      resistance: supportWindow?.high,
      reason: `Recent support is near ${format(supportWindow?.low)} and resistance is near ${format(supportWindow?.high)} from the latest candle window.`,
    },
    volume: {
      averageVolume,
      latestVolume,
      spike: volumeSpike,
      reason: volumeSpike
        ? "Latest volume is at least 1.5x the recent average."
        : "Latest volume is not meaningfully above the recent average.",
    },
    movingAverages: {
      ma20,
      ma50,
      ma200,
      priceAboveMa20,
      priceAboveMa50,
      priceAboveMa200,
      reclaimOrLoss,
      reason: `Price is ${priceAboveMa20 ? "above" : "below"} the 20 MA and ${priceAboveMa50 ? "above" : "below"} the 50 MA.`,
    },
    patterns: {
      consolidation,
      breakoutAttempt,
      pullback,
      candidates,
      reason:
        candidates.length > 0
          ? `Detected candidates: ${candidates.join(", ")}.`
          : "No clear breakout, pullback, or consolidation candidate from the current rule set.",
    },
    wyckoff: {
      rangeCandidate,
      bias: wyckoffBias,
      event: wyckoffEvent,
      rangeHigh: wyckoffWindow?.high,
      rangeLow: wyckoffWindow?.low,
      reason: rangeCandidate
        ? `${wyckoffBias ?? "possible Wyckoff"} read: price is moving inside a relatively defined range after a prior move. ${
            wyckoffEvent ? `Current event: ${wyckoffEvent}.` : "No clear spring, upthrust, test, SOS, or SOW event yet."
          }`
        : "Wyckoff mode is quiet because the chart does not yet show a clear range after a prior move.",
      confirmation: rangeCandidate
        ? "Confirmation would require follow-through at the range edge with volume and price holding the relevant side of the range."
        : "Confirmation would first require a clearer range to form.",
      invalidation: rangeCandidate
        ? "Invalidation would come from price leaving the range without the expected retest or volume behavior."
        : "There is no active Wyckoff candidate to invalidate yet.",
      beginnerExplanation:
        "Wyckoff analysis studies whether price is building a range where stronger buyers or sellers may be absorbing supply or demand. These labels are only candidates until confirmed by later price and volume behavior.",
    },
    annotations,
  };
}
