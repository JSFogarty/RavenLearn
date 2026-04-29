"use client";

import Link from "next/link";
import { AlertTriangle, BarChart3, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ChartError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="min-h-screen bg-[#070b10] text-foreground">
      <header className="flex h-14 items-center border-b border-border bg-[#0a0f16] px-4">
        <Link href="/" className="flex items-center gap-2 text-sm font-medium">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <BarChart3 className="size-4" />
          </span>
          Raven Learn
        </Link>
      </header>

      <section className="flex min-h-[calc(100vh-56px)] max-w-5xl items-center px-5">
        <div className="max-w-md rounded-md border border-border bg-[#0a0f16] p-5">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-md border border-amber-400/30 bg-amber-400/10 text-amber-200">
              <AlertTriangle className="size-5" />
            </span>
            <div>
              <h1 className="text-xl font-semibold tracking-normal">Chart could not load</h1>
              <p className="mt-1 text-sm text-muted-foreground">Market data or analysis failed before the chart could render.</p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <Button onClick={reset}>
              <RefreshCw className="size-4" />
              Try again
            </Button>
            <Button asChild variant="outline">
              <Link href="/screener">Open screener</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
