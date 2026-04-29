"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

type KeyboardShortcutsProps = {
  symbol: string;
};

const timeframeKeys = ["5m", "15m", "1h", "1D", "1W"];

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) || target.isContentEditable;
}

export function KeyboardShortcuts({ symbol }: KeyboardShortcutsProps) {
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey || isTypingTarget(event.target)) {
        return;
      }

      const timeframe = timeframeKeys[Number(event.key) - 1];

      if (timeframe) {
        router.push(`/learn/${symbol}?tf=${encodeURIComponent(timeframe)}`);
        return;
      }

      if (event.key.toLowerCase() === "s") {
        router.push("/screener");
      }
    };

    window.addEventListener("keydown", onKeyDown, true);

    return () => window.removeEventListener("keydown", onKeyDown, true);
  }, [router, symbol]);

  return null;
}
