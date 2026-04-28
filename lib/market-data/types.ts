export type Candle = {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  transactions?: number;
  vwap?: number;
};

export type TickerSnapshot = {
  symbol: string;
  price?: number;
  change?: number;
  changePercent?: number;
  dayVolume?: number;
  previousClose?: number;
  updated?: number;
};

export type MarketDataSource = "massive" | "fallback";

export type ChartMarketData = {
  symbol: string;
  candles: Candle[];
  snapshot?: TickerSnapshot;
  source: MarketDataSource;
  message?: string;
};

export type AggregateTimespan = "minute" | "hour" | "day" | "week" | "month";
