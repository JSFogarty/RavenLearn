import type { Candle } from "@/lib/market-data/types";

export const fallbackCandles: Candle[] = [
  { timestamp: 1, open: 44, close: 48, high: 50, low: 42, volume: 34 },
  { timestamp: 2, open: 47, close: 52, high: 54, low: 46, volume: 38 },
  { timestamp: 3, open: 51, close: 49, high: 53, low: 47, volume: 30 },
  { timestamp: 4, open: 50, close: 56, high: 58, low: 49, volume: 45 },
  { timestamp: 5, open: 55, close: 59, high: 61, low: 53, volume: 50 },
  { timestamp: 6, open: 58, close: 54, high: 60, low: 52, volume: 42 },
  { timestamp: 7, open: 55, close: 62, high: 64, low: 54, volume: 58 },
  { timestamp: 8, open: 61, close: 66, high: 68, low: 59, volume: 64 },
  { timestamp: 9, open: 65, close: 63, high: 67, low: 61, volume: 48 },
  { timestamp: 10, open: 64, close: 70, high: 72, low: 63, volume: 72 },
  { timestamp: 11, open: 69, close: 74, high: 76, low: 67, volume: 78 },
  { timestamp: 12, open: 73, close: 68, high: 75, low: 66, volume: 62 },
  { timestamp: 13, open: 69, close: 77, high: 79, low: 68, volume: 86 },
  { timestamp: 14, open: 76, close: 82, high: 84, low: 74, volume: 92 },
  { timestamp: 15, open: 81, close: 78, high: 83, low: 76, volume: 70 },
  { timestamp: 16, open: 79, close: 86, high: 88, low: 78, volume: 96 },
  { timestamp: 17, open: 85, close: 90, high: 92, low: 83, volume: 100 },
  { timestamp: 18, open: 89, close: 84, high: 91, low: 82, volume: 88 },
];
