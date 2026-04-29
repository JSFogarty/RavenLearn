import Link from "next/link";
import { BarChart3 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function SkeletonLine({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-muted/70 ${className}`} />;
}

export default function ScreenerLoading() {
  return (
    <main className="min-h-screen max-w-5xl px-5 py-5">
      <header className="mb-5">
        <Link href="/" className="mb-3 inline-flex items-center gap-2 text-sm text-muted-foreground">
          <BarChart3 className="size-4" />
          Raven Learn
        </Link>
        <SkeletonLine className="h-9 w-40" />
        <SkeletonLine className="mt-3 h-4 w-72" />
      </header>

      <section className="grid gap-5 2xl:grid-cols-[300px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Small-Account Preset</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonLine key={index} className="h-12 w-full" />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <SkeletonLine key={index} className="h-16 w-full" />
            ))}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
