"use client";

import { useMemo, useState } from "react";
import { Save, Search } from "lucide-react";

import { Button } from "@/components/ui/button";

type LearningJournalProps = {
  symbol: string;
  timeframe: string;
  score: number;
  patterns: string[];
  explanationSnapshot: string;
};

type LearningNote = LearningJournalProps & {
  id: string;
  note: string;
  savedAt: string;
};

const storageKey = "raven-learn-notes";

function readNotes() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(storageKey);

    return raw ? (JSON.parse(raw) as LearningNote[]) : [];
  } catch {
    return [];
  }
}

function writeNotes(notes: LearningNote[]) {
  window.localStorage.setItem(storageKey, JSON.stringify(notes));
}

export function LearningJournal({ symbol, timeframe, score, patterns, explanationSnapshot }: LearningJournalProps) {
  const [notes, setNotes] = useState<LearningNote[]>(() => readNotes());
  const [note, setNote] = useState("");
  const [query, setQuery] = useState("");

  const filteredNotes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return notes;
    }

    return notes.filter((item) =>
      [item.symbol, item.timeframe, item.note, item.patterns.join(" "), item.explanationSnapshot]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [notes, query]);

  const saveNote = () => {
    const nextNote: LearningNote = {
      id: `${symbol}-${timeframe}-${Date.now()}`,
      symbol,
      timeframe,
      score,
      patterns,
      explanationSnapshot,
      note: note.trim() || "Saved chart lesson.",
      savedAt: new Date().toISOString(),
    };
    const nextNotes = [nextNote, ...notes].slice(0, 24);

    setNotes(nextNotes);
    writeNotes(nextNotes);
    setNote("");
  };

  return (
    <section className="rounded-md border border-border bg-muted/25 p-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium">Learning Journal</p>
        <span className="text-xs text-muted-foreground">{notes.length} saved</span>
      </div>
      <textarea
        value={note}
        onChange={(event) => setNote(event.target.value)}
        className="mt-3 min-h-20 w-full resize-none rounded-md border border-border bg-[#070b10] px-3 py-2 text-xs leading-5 outline-none focus:border-primary"
        placeholder="What did this chart teach you?"
      />
      <Button className="mt-2 w-full" size="sm" onClick={saveNote}>
        <Save className="size-4" />
        Save Lesson
      </Button>
      <label className="mt-3 flex items-center gap-2 rounded-md border border-border bg-[#070b10] px-2 py-1.5 text-xs text-muted-foreground">
        <Search className="size-3.5" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="min-w-0 flex-1 bg-transparent text-foreground outline-none"
          placeholder="Search notes"
        />
      </label>
      <div className="mt-3 max-h-48 space-y-2 overflow-y-auto">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((item) => (
            <article key={item.id} className="rounded-md border border-border bg-[#070b10] p-2">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="font-medium">
                  {item.symbol} {item.timeframe}
                </span>
                <span className="text-muted-foreground">{item.score}/100</span>
              </div>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.note}</p>
              <p className="mt-1 text-[11px] leading-4 text-muted-foreground">
                {item.patterns.length > 0 ? item.patterns.join(", ") : "No pattern candidate saved"}
              </p>
            </article>
          ))
        ) : (
          <p className="rounded-md border border-dashed border-border p-3 text-xs leading-5 text-muted-foreground">
            Saved lessons will appear here.
          </p>
        )}
      </div>
    </section>
  );
}
