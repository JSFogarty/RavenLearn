import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  Crosshair,
  Maximize2,
  NotebookText,
  Pencil,
  Ruler,
  Search,
  Settings2,
  Timer,
  TrendingUp,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getChartMarketData } from "@/lib/market-data/chart-data";
import type { Candle } from "@/lib/market-data/types";
import { coachSections, setupScore, watchlist } from "@/lib/mock-data";

type ChartPageProps = {
  params: Promise<{
    symbol: string;
  }>;
};

const timeframes = ["5m", "15m", "1h", "1D", "1W"];
const tools = [Crosshair, Ruler, Pencil, TrendingUp, Timer, NotebookText, BookOpen, Settings2];

const totalScore = setupScore.reduce((sum, item) => sum + item.value, 0);

function formatPrice(value?: number) {
  return typeof value === "number" ? value.toFixed(2) : "--";
}

function formatVolume(value?: number) {
  if (typeof value !== "number") {
    return "--";
  }

  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }

  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(0)}k`;
  }

  return value.toFixed(0);
}

function getMovingAveragePoints(candles: Candle[], windowSize: number, priceToY: (price: number) => number, xForIndex: (index: number) => number) {
  return candles
    .map((_, index) => {
      const start = Math.max(0, index - windowSize + 1);
      const window = candles.slice(start, index + 1);
      const average = window.reduce((sum, candle) => sum + candle.close, 0) / window.length;

      return `${xForIndex(index)},${priceToY(average)}`;
    })
    .join(" ");
}

export default async function ChartPage({ params }: ChartPageProps) {
  const { symbol } = await params;
  const normalizedSymbol = symbol.toUpperCase();

  if (!/^[A-Z][A-Z0-9.-]{0,11}$/.test(normalizedSymbol)) {
    notFound();
  }

  const marketData = await getChartMarketData(normalizedSymbol);
  const candles = marketData.candles.slice(-18);
  const lastCandle = candles.at(-1);
  const high = Math.max(...candles.map((candle) => candle.high));
  const low = Math.min(...candles.map((candle) => candle.low));
  const range = Math.max(high - low, 1);
  const pricePadding = range * 0.14;
  const chartHigh = high + pricePadding;
  const chartLow = low - pricePadding;
  const maxVolume = Math.max(...candles.map((candle) => candle.volume), 1);
  const resistanceLevel = high;
  const supportLevel = candles.slice(-10).reduce((min, candle) => Math.min(min, candle.low), candles.at(-1)?.low ?? low);
  const xForIndex = (index: number) => 38 + index * (646 / Math.max(candles.length - 1, 1));
  const priceToY = (price: number) => 295 - ((price - chartLow) / (chartHigh - chartLow)) * 245;
  const volumeToY = (volume: number) => 382 - (volume / maxVolume) * 80;
  const ma20 = getMovingAveragePoints(candles, 20, priceToY, xForIndex);
  const ma50 = getMovingAveragePoints(candles, 50, priceToY, xForIndex);
  const latestPrice = marketData.snapshot?.price ?? lastCandle?.close ?? (chartHigh + chartLow) / 2;
  const sourceLabel = marketData.source === "massive" ? "Massive" : "Fallback";

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#070b10] text-foreground">
      <header className="flex h-14 items-center justify-between border-b border-border bg-[#0a0f16] px-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium">
            <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <BarChart3 className="size-4" />
            </span>
            Raven Learn
          </Link>
          <div className="h-6 border-l border-border" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold tracking-normal">{normalizedSymbol}</h1>
              <Badge variant="secondary">Daily</Badge>
              <Badge variant="outline">Setup {totalScore}</Badge>
              <Badge variant={marketData.source === "massive" ? "default" : "outline"}>{sourceLabel}</Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Search className="size-4" />
            Symbol
          </Button>
          {timeframes.map((timeframe) => (
            <Button key={timeframe} variant={timeframe === "1D" ? "secondary" : "ghost"} size="sm">
              {timeframe}
            </Button>
          ))}
          <Button size="icon" variant="outline" aria-label="Fullscreen">
            <Maximize2 className="size-4" />
          </Button>
        </div>
      </header>

      <section className="grid min-h-[calc(100vh-56px)] w-full max-w-[1060px] gap-0 lg:grid-cols-[160px_minmax(0,1fr)_280px]">
        <aside className="border-r border-border bg-[#090e15]">
          <div className="border-b border-border p-3">
            <p className="text-xs font-medium uppercase text-muted-foreground">Watchlist</p>
          </div>
          <div className="divide-y divide-border">
            {watchlist.map((item) => (
              <Link
                href={`/learn/${item.symbol}`}
                key={item.symbol}
                className={
                  item.symbol === normalizedSymbol
                    ? "block bg-primary/10 px-3 py-3"
                    : "block px-3 py-3 hover:bg-muted/30"
                }
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium">{item.symbol}</span>
                  <span className={item.change.startsWith("+") ? "text-xs text-primary" : "text-xs text-red-300"}>{item.change}</span>
                </div>
                <div className="mt-1 flex items-center justify-between gap-2 text-xs text-muted-foreground">
                  <span className="truncate">{item.trend}</span>
                  <span>{item.price}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="border-t border-border p-3">
            <p className="mb-3 text-xs font-medium uppercase text-muted-foreground">Tools</p>
            <div className="grid grid-cols-4 gap-2 lg:grid-cols-2">
              {tools.map((Icon, index) => (
                <Button key={index} variant="outline" size="icon" aria-label={`Tool ${index + 1}`}>
                  <Icon className="size-4" />
                </Button>
              ))}
            </div>
          </div>
        </aside>

        <section className="min-w-0 overflow-hidden bg-[#06090e]">
          <div className="flex h-10 items-center justify-between border-b border-border px-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>Price</span>
              <span>MA 20</span>
              <span>MA 50</span>
                <span>Volume {formatVolume(marketData.snapshot?.dayVolume ?? lastCandle?.volume)}</span>
            </div>
            <span>Educational chart study. No trade execution.</span>
          </div>

          <div className="relative h-[calc(100vh-156px)] min-h-[560px] overflow-hidden">
            <svg className="h-full w-full" viewBox="0 0 760 460" preserveAspectRatio="none" role="img" aria-label="Annotated candlestick chart">
              <rect width="760" height="460" fill="#06090e" />
              {[70, 125, 180, 235, 290, 345, 400].map((y) => (
                <line key={`h-${y}`} x1="0" x2="760" y1={y} y2={y} stroke="#1f2b3d" strokeWidth="1" />
              ))}
              {[76, 152, 228, 304, 380, 456, 532, 608, 684].map((x) => (
                <line key={`v-${x}`} x1={x} x2={x} y1="0" y2="460" stroke="#142033" strokeWidth="1" />
              ))}

              <line x1="0" x2="760" y1={priceToY(resistanceLevel)} y2={priceToY(resistanceLevel)} stroke="#34d399" strokeDasharray="5 5" strokeOpacity="0.75" />
              <line x1="0" x2="760" y1={priceToY(supportLevel)} y2={priceToY(supportLevel)} stroke="#60a5fa" strokeDasharray="5 5" strokeOpacity="0.65" />
              <rect x="105" y={priceToY(resistanceLevel) - 18} width="140" height="22" rx="3" fill="rgba(16,185,129,0.18)" />
              <text x="116" y={priceToY(resistanceLevel) - 3} fill="#a7f3d0" fontSize="12">
                Possible breakout level
              </text>
              <rect x="422" y={priceToY(supportLevel) - 18} width="100" height="22" rx="3" fill="rgba(59,130,246,0.18)" />
              <text x="432" y={priceToY(supportLevel) - 3} fill="#bfdbfe" fontSize="12">
                Higher low
              </text>

              <polyline points={ma50} fill="none" stroke="#60a5fa" strokeWidth="2" strokeOpacity="0.75" />
              <polyline points={ma20} fill="none" stroke="#facc15" strokeWidth="2" strokeOpacity="0.8" />

              {candles.map((candle, index) => {
                const up = candle.close >= candle.open;
                const y = Math.min(priceToY(candle.open), priceToY(candle.close));
                const height = Math.max(4, Math.abs(priceToY(candle.open) - priceToY(candle.close)));

                return (
                  <g key={candle.timestamp}>
                    <line
                      x1={xForIndex(index)}
                      x2={xForIndex(index)}
                      y1={priceToY(candle.high)}
                      y2={priceToY(candle.low)}
                      stroke={up ? "#22c55e" : "#ef4444"}
                      strokeWidth="2"
                    />
                    <rect x={xForIndex(index) - 7} y={y} width="14" height={height} rx="2" fill={up ? "#16a34a" : "#dc2626"} />
                    <rect
                      x={xForIndex(index) - 8}
                      y={volumeToY(candle.volume)}
                      width="16"
                      height={382 - volumeToY(candle.volume)}
                      rx="2"
                      fill={up ? "rgba(34,197,94,0.36)" : "rgba(239,68,68,0.36)"}
                    />
                  </g>
                );
              })}

              <line x1="24" x2="724" y1="382" y2="382" stroke="#2b3a52" strokeWidth="1" />
              <text x="650" y="54" fill="#8fa0b6" fontSize="12">
                {formatPrice(chartHigh)}
              </text>
              <text x="650" y="109" fill="#8fa0b6" fontSize="12">
                {formatPrice((chartHigh + latestPrice) / 2)}
              </text>
              <text x="650" y="219" fill="#8fa0b6" fontSize="12">
                {formatPrice(chartLow)}
              </text>
            </svg>

            <div className="absolute left-4 top-4 rounded-md border border-border bg-[#0a0f16]/95 px-3 py-2">
              <div className="flex items-center gap-3 text-xs">
                <span className="text-muted-foreground">O</span>
                <span>{formatPrice(lastCandle?.open)}</span>
                <span className="text-muted-foreground">H</span>
                <span>{formatPrice(lastCandle?.high)}</span>
                <span className="text-muted-foreground">L</span>
                <span>{formatPrice(lastCandle?.low)}</span>
                <span className="text-muted-foreground">C</span>
                <span className="text-primary">{formatPrice(lastCandle?.close)}</span>
              </div>
            </div>
            {marketData.message ? (
              <div className="absolute bottom-4 left-4 max-w-md rounded-md border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-xs leading-5 text-amber-100">
                {marketData.message}
              </div>
            ) : null}
          </div>
        </section>

        <aside className="border-l border-border bg-[#090e15]">
          <div className="border-b border-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">AI Coach</p>
                <p className="mt-1 text-xs text-muted-foreground">Structured chart read</p>
              </div>
              <Badge variant="outline">{totalScore}/100</Badge>
            </div>
          </div>

          <div className="max-h-[calc(100vh-160px)] space-y-3 overflow-y-auto p-4">
            {coachSections.map((section) => (
              <section key={section.title} className="border-b border-border pb-3 last:border-b-0">
                <p className="text-sm font-medium">{section.title}</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{section.text}</p>
              </section>
            ))}

            <section className="rounded-md border border-border bg-muted/25 p-3">
              <p className="text-sm font-medium">Setup Quality</p>
              <div className="mt-3 space-y-2">
                {setupScore.map((item) => (
                  <div key={item.label}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span>
                        {item.value}/{item.max}
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${(item.value / item.max) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-md border border-border bg-muted/25 p-3">
              <p className="text-sm font-medium">Session Note</p>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                Price is near a clear resistance line. Watch whether volume confirms strength or fades back into the range.
              </p>
            </section>
          </div>
        </aside>
      </section>
    </main>
  );
}
