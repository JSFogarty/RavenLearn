import { getCached, setCached } from "@/lib/market-data/cache";
import type { AggregateTimespan, Candle, TickerSnapshot } from "@/lib/market-data/types";

const MASSIVE_API_BASE_URL = process.env.MASSIVE_API_BASE_URL ?? "https://api.massive.com";
const CACHE_TTL_MS = 60_000;

type MassiveAggregate = {
  c?: number;
  h?: number;
  l?: number;
  n?: number;
  o?: number;
  t?: number;
  v?: number;
  vw?: number;
};

type MassiveAggregatesResponse = {
  results?: MassiveAggregate[];
  status?: string;
  error?: string;
  message?: string;
};

type MassiveSnapshotTicker = {
  day?: { c?: number; h?: number; l?: number; o?: number; v?: number };
  min?: { c?: number; h?: number; l?: number; o?: number; v?: number };
  prevDay?: { c?: number; v?: number };
  ticker?: string;
  todaysChange?: number;
  todaysChangePerc?: number;
  updated?: number;
};

type MassiveSnapshotResponse = {
  ticker?: MassiveSnapshotTicker;
  status?: string;
  error?: string;
  message?: string;
};

function getMassiveApiKey() {
  return process.env.MASSIVE_API_KEY;
}

async function fetchMassiveJson<T>(path: string, searchParams?: Record<string, string>) {
  const apiKey = getMassiveApiKey();

  if (!apiKey) {
    throw new Error("Missing MASSIVE_API_KEY");
  }

  const url = new URL(path, MASSIVE_API_BASE_URL);

  for (const [key, value] of Object.entries(searchParams ?? {})) {
    url.searchParams.set(key, value);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);

  let response: Response;

  try {
    response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      next: {
        revalidate: 60,
      },
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    throw new Error(`Massive request failed with HTTP ${response.status}`);
  }

  const data = (await response.json()) as T;

  if (typeof data === "object" && data && "error" in data && typeof data.error === "string") {
    throw new Error(data.error);
  }

  return data;
}

export function normalizeAggregate(aggregate: MassiveAggregate): Candle | undefined {
  if (
    typeof aggregate.t !== "number" ||
    typeof aggregate.o !== "number" ||
    typeof aggregate.h !== "number" ||
    typeof aggregate.l !== "number" ||
    typeof aggregate.c !== "number" ||
    typeof aggregate.v !== "number"
  ) {
    return undefined;
  }

  return {
    timestamp: aggregate.t,
    open: aggregate.o,
    high: aggregate.h,
    low: aggregate.l,
    close: aggregate.c,
    volume: aggregate.v,
    transactions: aggregate.n,
    vwap: aggregate.vw,
  };
}

export async function getStockAggregates({
  symbol,
  from,
  to,
  multiplier = 1,
  timespan = "day",
}: {
  symbol: string;
  from: string;
  to: string;
  multiplier?: number;
  timespan?: AggregateTimespan;
}) {
  const cacheKey = `massive:aggregates:${symbol}:${multiplier}:${timespan}:${from}:${to}`;
  const cached = getCached<Candle[]>(cacheKey);

  if (cached) {
    return cached;
  }

  const response = await fetchMassiveJson<MassiveAggregatesResponse>(
    `/v2/aggs/ticker/${encodeURIComponent(symbol)}/range/${multiplier}/${timespan}/${from}/${to}`,
    {
      adjusted: "true",
      sort: "asc",
      limit: "120",
    },
  );

  const candles = (response.results ?? []).map(normalizeAggregate).filter((candle): candle is Candle => Boolean(candle));

  if (candles.length === 0) {
    throw new Error(response.message ?? "Massive returned no aggregate candles");
  }

  setCached(cacheKey, candles, CACHE_TTL_MS);
  return candles;
}

export async function getStockSnapshot(symbol: string): Promise<TickerSnapshot> {
  const cacheKey = `massive:snapshot:${symbol}`;
  const cached = getCached<TickerSnapshot>(cacheKey);

  if (cached) {
    return cached;
  }

  const response = await fetchMassiveJson<MassiveSnapshotResponse>(
    `/v2/snapshot/locale/us/markets/stocks/tickers/${encodeURIComponent(symbol)}`,
  );
  const ticker = response.ticker;

  if (!ticker) {
    throw new Error(response.message ?? "Massive returned no ticker snapshot");
  }

  const price = ticker.min?.c ?? ticker.day?.c;
  const snapshot: TickerSnapshot = {
    symbol: ticker.ticker ?? symbol,
    price,
    change: ticker.todaysChange,
    changePercent: ticker.todaysChangePerc,
    dayVolume: ticker.day?.v,
    previousClose: ticker.prevDay?.c,
    previousVolume: ticker.prevDay?.v,
    updated: ticker.updated,
  };

  setCached(cacheKey, snapshot, CACHE_TTL_MS);
  return snapshot;
}
