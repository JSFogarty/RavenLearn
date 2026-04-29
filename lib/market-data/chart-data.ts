import { fallbackCandles } from "@/lib/market-data/fallback";
import { getStockAggregates, getStockSnapshot } from "@/lib/market-data/massive";
import type { AggregateTimespan, ChartMarketData } from "@/lib/market-data/types";

export type ChartTimeframe = "5m" | "15m" | "1h" | "1D" | "1W";

const timeframeConfig: Record<
  ChartTimeframe,
  {
    lookbackDays: number;
    multiplier: number;
    timespan: AggregateTimespan;
    visibleCandles: number;
  }
> = {
  "5m": { lookbackDays: 3, multiplier: 5, timespan: "minute", visibleCandles: 72 },
  "15m": { lookbackDays: 7, multiplier: 15, timespan: "minute", visibleCandles: 72 },
  "1h": { lookbackDays: 30, multiplier: 1, timespan: "hour", visibleCandles: 72 },
  "1D": { lookbackDays: 320, multiplier: 1, timespan: "day", visibleCandles: 80 },
  "1W": { lookbackDays: 900, multiplier: 1, timespan: "week", visibleCandles: 80 },
};

export function normalizeChartTimeframe(value?: string): ChartTimeframe {
  if (value === "5m" || value === "15m" || value === "1h" || value === "1D" || value === "1W") {
    return value;
  }

  return "1D";
}

export function getVisibleCandleCount(timeframe: ChartTimeframe) {
  return timeframeConfig[timeframe].visibleCandles;
}

function toIsoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export async function getChartMarketData(symbol: string, timeframe: ChartTimeframe = "1D"): Promise<ChartMarketData> {
  const config = timeframeConfig[timeframe];
  const to = new Date();
  const from = new Date(to);
  from.setDate(to.getDate() - config.lookbackDays);

  try {
    const [candles, snapshot] = await Promise.all([
      getStockAggregates({
        symbol,
        from: toIsoDate(from),
        to: toIsoDate(to),
        multiplier: config.multiplier,
        timespan: config.timespan,
      }),
      getStockSnapshot(symbol),
    ]);

    return {
      symbol,
      candles,
      snapshot,
      source: "massive",
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Market data unavailable";

    return {
      symbol,
      candles: fallbackCandles,
      source: "fallback",
      message,
    };
  }
}
