import Link from "next/link";
import { BarChart3, Maximize2, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const timeframes = ["5m", "15m", "1h", "1D", "1W"];
const watchlistSkeleton = ["AAPL", "AMD", "PLTR", "SOFI"];
const coachSkeleton = ["Current Read", "Trend", "Volume", "Key Levels", "Confirmation", "Invalidation"];

function SkeletonLine({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-muted/70 ${className}`} />;
}

export default function Loading() {
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
          <div className="flex items-center gap-2">
            <SkeletonLine className="h-6 w-16" />
            <Badge variant="secondary">Daily</Badge>
            <Badge variant="outline">Loading</Badge>
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
            {watchlistSkeleton.map((symbol) => (
              <div key={symbol} className="px-3 py-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium">{symbol}</span>
                  <SkeletonLine className="h-3 w-9" />
                </div>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <SkeletonLine className="h-3 w-16" />
                  <SkeletonLine className="h-3 w-10" />
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border p-3">
            <p className="mb-3 text-xs font-medium uppercase text-muted-foreground">Tools</p>
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: 8 }).map((_, index) => (
                <SkeletonLine key={index} className="h-9 w-9" />
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
              <span>Volume</span>
            </div>
            <span>Loading market data...</span>
          </div>

          <div className="relative h-[calc(100vh-156px)] min-h-[560px] overflow-hidden">
            <div className="absolute inset-0 chart-grid opacity-80" />
            <div className="absolute left-4 top-4 rounded-md border border-border bg-[#0a0f16]/95 px-3 py-2">
              <div className="flex items-center gap-3">
                <SkeletonLine className="h-3 w-44" />
              </div>
            </div>
            <div className="absolute inset-x-10 top-[28%] h-px border-t border-dashed border-primary/50" />
            <div className="absolute inset-x-10 top-[54%] h-px border-t border-dashed border-blue-400/40" />
            <div className="absolute inset-x-12 bottom-10 flex h-28 items-end gap-3 border-t border-border/80 pt-4">
              {Array.from({ length: 18 }).map((_, index) => (
                <div
                  key={index}
                  className="flex-1 animate-pulse rounded-sm bg-primary/25"
                  style={{ height: `${28 + ((index * 11) % 64)}%` }}
                />
              ))}
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md border border-border bg-[#0a0f16]/95 px-4 py-3 text-sm text-muted-foreground">
              Loading candles and snapshot...
            </div>
          </div>
        </section>

        <aside className="border-l border-border bg-[#090e15]">
          <div className="border-b border-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">AI Coach</p>
                <p className="mt-1 text-xs text-muted-foreground">Preparing structured chart read</p>
              </div>
              <SkeletonLine className="h-5 w-14" />
            </div>
          </div>

          <div className="max-h-[calc(100vh-160px)] space-y-4 overflow-y-auto p-4">
            {coachSkeleton.map((section) => (
              <section key={section} className="border-b border-border pb-4 last:border-b-0">
                <p className="text-sm font-medium">{section}</p>
                <SkeletonLine className="mt-3 h-3 w-full" />
                <SkeletonLine className="mt-2 h-3 w-4/5" />
              </section>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
