import { scoreScreenerSnapshot } from "@/lib/analysis/setup-score";
import { getStockSnapshot } from "@/lib/market-data/massive";
import type { TickerSnapshot } from "@/lib/market-data/types";

export type ScreenerFilters = {
  minPrice: number;
  maxPrice: number;
  minVolume: number;
  minRelativeVolume: number;
};

export type ScreenerResult = {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  volume: number;
  relativeVolume?: number;
  trend: string;
  pattern: string;
  score: number;
  reason: string;
  source: "massive" | "fallback";
};

export const smallAccountPreset: ScreenerFilters = {
  minPrice: 2,
  maxPrice: 50,
  minVolume: 500_000,
  minRelativeVolume: 1.0,
};

const starterUniverse = ["AMD", "PLTR", "HOOD", "SOFI", "AAPL", "NVDA", "F", "BAC"];

const companyNames: Record<string, string> = {
  AAPL: "Apple",
  AMD: "Advanced Micro Devices",
  BAC: "Bank of America",
  F: "Ford",
  HOOD: "Robinhood",
  NVDA: "NVIDIA",
  PLTR: "Palantir",
  SOFI: "SoFi",
};

const fallbackSnapshots: TickerSnapshot[] = [
  { symbol: "AMD", price: 42.18, changePercent: 4.1, dayVolume: 88_100_000, previousVolume: 40_000_000 },
  { symbol: "PLTR", price: 28.74, changePercent: 2.6, dayVolume: 51_700_000, previousVolume: 28_000_000 },
  { symbol: "HOOD", price: 18.92, changePercent: 3.3, dayVolume: 24_500_000, previousVolume: 15_000_000 },
  { symbol: "SOFI", price: 18.36, changePercent: -0.7, dayVolume: 67_000_000, previousVolume: 48_000_000 },
  { symbol: "F", price: 12.18, changePercent: 0.9, dayVolume: 44_000_000, previousVolume: 36_000_000 },
  { symbol: "BAC", price: 38.12, changePercent: 1.2, dayVolume: 31_000_000, previousVolume: 30_000_000 },
];

function getTrendLabel(changePercent: number, relativeVolume?: number) {
  if (changePercent >= 3 && (relativeVolume ?? 0) >= 1.5) {
    return "Breakout attempt";
  }

  if (changePercent >= 1) {
    return "Uptrend";
  }

  if (changePercent <= -2) {
    return "Downtrend";
  }

  return "Range";
}

function getPatternCandidate(changePercent: number, relativeVolume?: number) {
  if (changePercent >= 3 && (relativeVolume ?? 0) >= 1.5) {
    return "Possible breakout";
  }

  if (changePercent > 0) {
    return "Pullback candidate";
  }

  return "Support test";
}

function scoreSnapshot(snapshot: TickerSnapshot, relativeVolume?: number) {
  return scoreScreenerSnapshot({
    snapshot,
    maxPrice: smallAccountPreset.maxPrice,
    minVolume: smallAccountPreset.minVolume,
    relativeVolume,
  }).total;
}

function explainResult(snapshot: TickerSnapshot, relativeVolume?: number) {
  const reasons = [];

  if (typeof snapshot.price === "number") {
    reasons.push(`price is inside the $${smallAccountPreset.minPrice}-$${smallAccountPreset.maxPrice} preset`);
  }

  if ((snapshot.dayVolume ?? 0) >= smallAccountPreset.minVolume) {
    reasons.push("volume is above the active-liquidity floor");
  }

  if ((snapshot.changePercent ?? 0) > 0) {
    reasons.push("price is showing positive session movement");
  }

  if ((relativeVolume ?? 0) >= 1.5) {
    reasons.push("relative volume is elevated");
  }

  const score = scoreScreenerSnapshot({
    snapshot,
    maxPrice: smallAccountPreset.maxPrice,
    minVolume: smallAccountPreset.minVolume,
    relativeVolume,
  });

  return `${score.reason} Evidence: ${reasons.join(", ")}.`;
}

function toResult(snapshot: TickerSnapshot, source: ScreenerResult["source"]): ScreenerResult | undefined {
  if (typeof snapshot.price !== "number" || typeof snapshot.dayVolume !== "number") {
    return undefined;
  }

  const relativeVolume =
    typeof snapshot.previousVolume === "number" && snapshot.previousVolume > 0 ? snapshot.dayVolume / snapshot.previousVolume : undefined;
  const changePercent = snapshot.changePercent ?? 0;

  return {
    symbol: snapshot.symbol,
    name: companyNames[snapshot.symbol] ?? snapshot.symbol,
    price: snapshot.price,
    changePercent,
    volume: snapshot.dayVolume,
    relativeVolume,
    trend: getTrendLabel(changePercent, relativeVolume),
    pattern: getPatternCandidate(changePercent, relativeVolume),
    score: scoreSnapshot(snapshot, relativeVolume),
    reason: explainResult(snapshot, relativeVolume),
    source,
  };
}

function passesSmallAccountPreset(result: ScreenerResult, filters: ScreenerFilters) {
  return (
    result.price >= filters.minPrice &&
    result.price <= filters.maxPrice &&
    result.volume >= filters.minVolume &&
    (result.relativeVolume ?? 1) >= filters.minRelativeVolume
  );
}

export async function getScreenerResults(filters = smallAccountPreset) {
  const settled = await Promise.allSettled(starterUniverse.map((symbol) => getStockSnapshot(symbol)));
  const snapshots = settled
    .map((result) => (result.status === "fulfilled" ? toResult(result.value, "massive") : undefined))
    .filter((result): result is ScreenerResult => Boolean(result));

  const fallbackResults = fallbackSnapshots.map((snapshot) => toResult(snapshot, "fallback")).filter((result): result is ScreenerResult => Boolean(result));
  const bySymbol = new Map<string, ScreenerResult>();

  for (const result of [...fallbackResults, ...snapshots]) {
    bySymbol.set(result.symbol, result);
  }

  return Array.from(bySymbol.values())
    .filter((result) => passesSmallAccountPreset(result, filters))
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
}
