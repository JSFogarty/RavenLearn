import Link from "next/link";
import { ArrowUpRight, BarChart3, Filter, Search, SlidersHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { screenerResults } from "@/lib/mock-data";

const filters = [
  { label: "Min price", value: "$2" },
  { label: "Max price", value: "$50" },
  { label: "Min volume", value: "500k" },
  { label: "Rel volume", value: "1.5x" },
  { label: "Trend", value: "Constructive" },
  { label: "Setup", value: "Readable" },
];

export default function ScreenerPage() {
  return (
    <main className="min-h-screen max-w-5xl px-5 py-5">
      <header className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href="/" className="mb-3 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <BarChart3 className="size-4" />
            Raven Learn
          </Link>
          <h1 className="text-3xl font-semibold tracking-normal">Screener</h1>
          <p className="mt-1 text-sm text-muted-foreground">Active, affordable candidates for chart study.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">
            <Search className="size-4" />
            Symbols
          </Button>
          <Button>
            <SlidersHorizontal className="size-4" />
            Preset
          </Button>
        </div>
      </header>

      <section className="grid gap-5 2xl:grid-cols-[300px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Small-Account Preset</CardTitle>
            <CardDescription>Filters currently active.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {filters.map((filter) => (
              <div key={filter.label} className="flex items-center justify-between rounded-md border border-border bg-muted/35 p-3">
                <span className="text-sm text-muted-foreground">{filter.label}</span>
                <span className="text-sm font-medium">{filter.value}</span>
              </div>
            ))}
            <div className="rounded-md border border-primary/30 bg-primary/10 p-3 text-sm leading-6 text-primary">
              High-priced symbols stay out of this preset until the max price filter is removed.
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Results</CardTitle>
              <CardDescription>Ranked by activity, price fit, and chart readability.</CardDescription>
            </div>
            <Badge variant="secondary">
              <Filter className="mr-1 size-3" />
              {screenerResults.length} symbols
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-md border border-border">
              <div className="hidden grid-cols-[0.8fr_1.35fr_0.75fr_0.75fr_0.85fr_1fr_0.7fr_1.6fr_0.35fr] gap-3 border-b border-border bg-muted/45 px-4 py-3 text-xs text-muted-foreground 2xl:grid">
                <span>Symbol</span>
                <span>Name</span>
                <span>Price</span>
                <span>Change</span>
                <span>Rel vol</span>
                <span>Trend</span>
                <span>Score</span>
                <span>Reason</span>
                <span />
              </div>
              {screenerResults.map((result) => (
                <div
                  key={result.symbol}
                  className="grid gap-3 border-b border-border px-4 py-4 text-sm last:border-b-0 2xl:grid-cols-[0.8fr_1.35fr_0.75fr_0.75fr_0.85fr_1fr_0.7fr_1.6fr_0.35fr] 2xl:items-center"
                >
                  <div>
                    <p className="font-semibold">{result.symbol}</p>
                    <p className="text-xs text-muted-foreground 2xl:hidden">{result.name}</p>
                  </div>
                  <span className="hidden text-muted-foreground 2xl:block">{result.name}</span>
                  <span>{result.price}</span>
                  <span className={result.change.startsWith("+") ? "text-primary" : "text-red-300"}>{result.change}</span>
                  <span>{result.relativeVolume}</span>
                  <Badge variant="outline">{result.trend}</Badge>
                  <span className="font-semibold">{result.score}</span>
                  <span className="text-muted-foreground">{result.reason}</span>
                  <Button asChild variant="ghost" size="icon" aria-label={`Open ${result.symbol}`}>
                    <Link href={`/learn/${result.symbol}`}>
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
