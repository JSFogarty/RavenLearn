import Link from "next/link";
import { BarChart3, LineChart, NotebookText, Search, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { recentReviews, screenerResults, watchlist } from "@/lib/mock-data";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/screener", label: "Screener" },
  { href: "/learn/AMD", label: "Chart" },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <header className="border-b border-border/70 bg-background/90 backdrop-blur">
        <div className="flex max-w-5xl items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <BarChart3 className="size-5" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-normal">Raven Learn</p>
              <p className="text-xs text-muted-foreground">Chart reading cockpit</p>
            </div>
          </Link>
          <nav className="hidden items-center gap-2 sm:flex">
            {navItems.map((item) => (
              <Button key={item.href} asChild variant="ghost" size="sm">
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
          </nav>
        </div>
      </header>

      <section className="grid max-w-5xl gap-5 px-5 py-5 2xl:grid-cols-[1.55fr_0.85fr]">
        <div className="space-y-5">
          <div className="rounded-lg border border-border bg-card/80 p-5">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-3xl font-semibold tracking-normal text-foreground">Dashboard</h1>
                <p className="mt-1 text-sm text-muted-foreground">Active watchlist, study candidates, and recent reviews.</p>
              </div>
              <Button asChild>
                <Link href="/screener">
                  <Search className="size-4" />
                  Open screener
                </Link>
              </Button>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-md border border-border bg-muted/40 p-4">
                <p className="text-xs text-muted-foreground">Candidates</p>
                <p className="mt-2 text-2xl font-semibold">18</p>
              </div>
              <div className="rounded-md border border-border bg-muted/40 p-4">
                <p className="text-xs text-muted-foreground">Small-account filter</p>
                <p className="mt-2 text-2xl font-semibold">$2-$50</p>
              </div>
              <div className="rounded-md border border-border bg-muted/40 p-4">
                <p className="text-xs text-muted-foreground">Average setup score</p>
                <p className="mt-2 text-2xl font-semibold">67</p>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Study Chart</CardTitle>
                <CardDescription>AMD daily structure with key callouts.</CardDescription>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href="/learn/AMD">
                  <LineChart className="size-4" />
                  Open
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="relative h-80 overflow-hidden rounded-md border border-border bg-background">
                <div className="absolute inset-x-0 top-1/4 z-10 border-t border-dashed border-emerald-400/50" />
                <div className="absolute inset-x-0 bottom-1/3 z-10 border-t border-dashed border-blue-400/40" />
                <div className="absolute left-[12%] top-[22%] z-20 rounded bg-emerald-500/15 px-2 py-1 text-xs text-emerald-200">
                  Potential breakout line
                </div>
                <div className="absolute bottom-[30%] left-[58%] z-20 rounded bg-blue-500/15 px-2 py-1 text-xs text-blue-200">
                  Higher low zone
                </div>
                <div className="relative z-10 flex h-full items-end gap-2 px-6 pb-8 pt-10">
                  {[38, 45, 42, 50, 58, 54, 63, 68, 64, 72, 76, 70, 82, 88, 84, 92].map((height, index) => (
                    <div key={index} className="flex h-full flex-1 items-end justify-center">
                      <div
                        className={index % 3 === 0 ? "w-3 rounded-sm bg-red-400/80" : "w-3 rounded-sm bg-primary/85"}
                        style={{ height: `${height}%` }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <CardHeader>
              <CardTitle>Watchlist</CardTitle>
              <CardDescription>Symbols inside the current study universe.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {watchlist.map((item) => (
                <Link
                  href={`/learn/${item.symbol}`}
                  key={item.symbol}
                  className="flex items-center justify-between rounded-md border border-border bg-muted/35 p-3"
                >
                  <div>
                    <p className="font-medium">{item.symbol}</p>
                    <p className="text-xs text-muted-foreground">{item.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{item.price}</p>
                    <p className="text-xs text-primary">{item.change}</p>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Screener Preview</CardTitle>
              <CardDescription>Top candidates from the active preset.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {screenerResults.slice(0, 3).map((item) => (
                <div key={item.symbol} className="rounded-md border border-border bg-muted/35 p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="size-4 text-primary" />
                      <span className="font-medium">{item.symbol}</span>
                    </div>
                    <Badge variant="secondary">{item.score}</Badge>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">{item.reason}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Reviews</CardTitle>
              <CardDescription>Learning journal activity.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentReviews.map((review) => (
                <div key={`${review.symbol}-${review.time}`} className="flex gap-3 rounded-md border border-border bg-muted/35 p-3">
                  <NotebookText className="mt-0.5 size-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">{review.symbol}</p>
                    <p className="text-xs leading-5 text-muted-foreground">{review.title}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
