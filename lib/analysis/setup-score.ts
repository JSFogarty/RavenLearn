import type { ChartAnalysis } from "@/lib/analysis/rules";
import type { TickerSnapshot } from "@/lib/market-data/types";

export type SetupScoreItem = {
  label: string;
  value: number;
  max: number;
  explanation: string;
};

export type SetupQualityScore = {
  total: number;
  max: number;
  label: string;
  items: SetupScoreItem[];
  summary: string;
};

type ScreenerScoreInput = {
  snapshot: TickerSnapshot;
  maxPrice: number;
  minVolume: number;
  relativeVolume?: number;
};

function clampScore(value: number, max: number) {
  return Math.min(Math.max(Math.round(value), 0), max);
}

function getScoreLabel(total: number) {
  if (total >= 80) {
    return "Very readable";
  }

  if (total >= 65) {
    return "Readable";
  }

  if (total >= 50) {
    return "Mixed";
  }

  return "Needs clarity";
}

export function scoreChartSetup(analysis: ChartAnalysis): SetupQualityScore {
  const trendScore = clampScore(
    analysis.trend.direction === "uptrend" ? 18 : analysis.trend.direction === "range" ? 11 : 6,
    20,
  );
  const volumeScore = clampScore(analysis.volume.spike ? 18 : analysis.volume.latestVolume >= analysis.volume.averageVolume ? 13 : 8, 20);
  const structureScore = clampScore(
    analysis.structure.higherHigh || analysis.structure.higherLow
      ? 17
      : analysis.structure.lowerLow || analysis.structure.lowerHigh
        ? 7
        : 11,
    20,
  );
  const hasClearLevels = typeof analysis.levels.support === "number" && typeof analysis.levels.resistance === "number";
  const locationScore = clampScore(hasClearLevels ? (analysis.patterns.breakoutAttempt || analysis.patterns.pullback ? 17 : 13) : 7, 20);
  const confirmationSignals = [
    analysis.volume.spike,
    analysis.patterns.breakoutAttempt,
    analysis.patterns.pullback,
    Boolean(analysis.movingAverages.reclaimOrLoss),
    analysis.movingAverages.priceAboveMa20 && analysis.movingAverages.priceAboveMa50,
  ].filter(Boolean).length;
  const confirmationScore = clampScore(7 + confirmationSignals * 3, 20);
  const items: SetupScoreItem[] = [
    {
      label: "Trend",
      value: trendScore,
      max: 20,
      explanation:
        analysis.trend.direction === "uptrend"
          ? "Price is reading constructively against the moving averages."
          : analysis.trend.direction === "range"
            ? "Trend evidence is mixed, so this is more of a range read."
            : "Trend evidence is weak or defensive.",
    },
    {
      label: "Volume",
      value: volumeScore,
      max: 20,
      explanation: analysis.volume.reason,
    },
    {
      label: "Structure",
      value: structureScore,
      max: 20,
      explanation: analysis.structure.reason,
    },
    {
      label: "Location",
      value: locationScore,
      max: 20,
      explanation: hasClearLevels
        ? "Support and resistance are clear enough to frame the lesson."
        : "The nearby levels are not clear enough yet.",
    },
    {
      label: "Confirmation",
      value: confirmationScore,
      max: 20,
      explanation:
        confirmationSignals >= 3
          ? "Several evidence types agree, but it still needs confirmation."
          : "The evidence is incomplete, so treat this as a learning setup rather than a strong read.",
    },
  ];
  const total = items.reduce((sum, item) => sum + item.value, 0);

  return {
    total,
    max: 100,
    label: getScoreLabel(total),
    items,
    summary: `${getScoreLabel(total)} educational setup: the score rates chart readability, not whether to buy or sell.`,
  };
}

export function scoreScreenerSnapshot({ snapshot, maxPrice, minVolume, relativeVolume }: ScreenerScoreInput) {
  const priceFit = typeof snapshot.price === "number" && snapshot.price <= maxPrice ? 16 : 6;
  const volumeFit = typeof snapshot.dayVolume === "number" && snapshot.dayVolume >= minVolume ? 18 : 8;
  const relativeVolumeFit = typeof relativeVolume === "number" ? Math.min(relativeVolume * 8, 18) : 9;
  const activityFit = Math.min(Math.abs(snapshot.changePercent ?? 0) * 4, 18);
  const directionFit = (snapshot.changePercent ?? 0) >= 0 ? 14 : 9;
  const total = clampScore(priceFit + volumeFit + relativeVolumeFit + activityFit + directionFit + 16, 100);

  return {
    total,
    label: getScoreLabel(total),
    reason: `${getScoreLabel(total)} study candidate based on price fit, liquidity, relative volume, and session movement.`,
  };
}
