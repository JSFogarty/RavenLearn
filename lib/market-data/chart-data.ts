import { fallbackCandles } from "@/lib/market-data/fallback";
import { getStockAggregates, getStockSnapshot } from "@/lib/market-data/massive";
import type { ChartMarketData } from "@/lib/market-data/types";

function toIsoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export async function getChartMarketData(symbol: string): Promise<ChartMarketData> {
  const to = new Date();
  const from = new Date(to);
  from.setDate(to.getDate() - 45);

  try {
    const [candles, snapshot] = await Promise.all([
      getStockAggregates({
        symbol,
        from: toIsoDate(from),
        to: toIsoDate(to),
        multiplier: 1,
        timespan: "day",
      }),
      getStockSnapshot(symbol),
    ]);

    return {
      symbol,
      candles: candles.slice(-28),
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
