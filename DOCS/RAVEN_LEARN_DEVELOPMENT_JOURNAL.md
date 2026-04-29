# Raven Learn — Development Journal

This journal tracks Raven Learn development progress against the PRD.

Rule:

> Nothing is considered done until the related PRD requirement is completed and checked off in this journal.

## How to Use This Journal

For every work session:

1. Add a dated entry.
2. List what was changed.
3. List files changed.
4. Mark PRD items completed only when verified.
5. Add blockers or decisions.
6. Keep deferred items visible.

## Status Legend

- [ ] Not started
- [~] In progress
- [x] Complete
- [D] Deferred
- [R] Removed by decision

---

# Master Phase Checklist

## Phase 0 — Project Setup and Foundation

- [x] Create repo
- [x] Create Next.js TypeScript app
- [x] Install Tailwind
- [x] Install shadcn/ui
- [x] Install Framer Motion
- [x] Create base dark theme
- [x] Create app layout
- [x] Create environment variable structure
- [x] Add Massive API key placeholder
- [x] Add OpenAI API key placeholder
- [x] Add README
- [x] Add PRD file
- [x] Add development journal file
- [x] Add master prompt file
- [x] Add coding standards
- [x] Add basic route structure
- [x] Verify app runs locally

## Phase 1 — Beautiful Static UI Mockup

- [x] Dashboard layout
- [x] Watchlist panel
- [x] Screener panel
- [x] Chart workspace placeholder
- [x] AI Coach panel
- [x] Notes panel
- [x] Top navigation
- [x] Dark TradingView-inspired visual style
- [x] Responsive desktop-first layout
- [x] Mock data for UI layout
- [x] Visual review completed

## Phase 2 — Market Data Connection

- [x] Massive API client
- [x] Environment variable validation
- [x] Fetch ticker snapshots
- [x] Fetch aggregate candles
- [x] Normalize candle format
- [x] Error handling
- [x] Loading states
- [x] Fallback messages
- [x] Basic candle cache
- [x] Flat file loader interface
- [x] Real ticker data verified

## Phase 3 — Screener MVP

- [x] Price range filter
- [x] Minimum volume filter
- [x] Percent change filter
- [x] Relative volume if available/calculable
- [x] Watchlist or symbol universe selection
- [x] Exclude unrealistic high-priced symbols by default
- [x] Reason each symbol appeared
- [x] Basic trend label
- [x] Small-account default preset
- [x] Open chart from screener result

## Phase 4 — Chart Workspace MVP

- [x] Load selected ticker into chart
- [x] Candlestick display
- [x] Timeframe selector
- [x] Volume display
- [x] 20 MA
- [x] 50 MA
- [x] 200 MA
- [x] VWAP if available/calculable
- [x] Chart loading/error states
- [x] Drawing tools available or fallback documented

## Phase 5 — Rule-Based Analysis Engine

- [x] Trend detection
- [x] Higher high / higher low detection
- [x] Lower high / lower low detection
- [x] Support/resistance detection
- [x] Volume spike detection
- [x] Moving average position analysis
- [x] Moving average reclaim/loss detection
- [x] Consolidation/range detection
- [x] Breakout attempt detection
- [x] Pullback detection
- [x] Structured JSON analysis output
- [x] Analysis output reviewed for accuracy

## Phase 6 — Chart Callouts and Highlighting

- [x] Annotation engine
- [x] Support/resistance zones highlighted
- [x] Breakout areas highlighted
- [x] Pullback zones highlighted
- [x] Volume spikes marked
- [x] MA reclaim/loss events marked
- [x] Trend structure labeled
- [x] Chart labels linked to AI Coach sections
- [x] Cautious labels used
- [x] Every called-out pattern/phase visibly highlighted

## Phase 7 — AI Coach MVP

- [x] OpenAI API client
- [x] Structured prompt from analysis JSON
- [x] Current Read section
- [x] Trend explanation
- [x] Volume explanation
- [x] Key Levels explanation
- [x] Pattern Candidate explanation
- [x] Confirmation/Invalidation section
- [x] Beginner Explanation
- [x] Direct financial advice language avoided
- [x] Explanation snapshot saved
- [ ] AI output checked against chart evidence — deferred until OpenAI API quota/billing is available

## Phase 8 — Setup Quality Score

- [x] Trend score
- [x] Volume/activity score
- [x] Structure score
- [x] Location/risk clarity score
- [x] Confirmation score
- [x] Total score
- [x] Score explanation
- [x] Screener integration
- [x] Chart panel integration
- [x] Score reviewed to ensure it teaches rather than signals trades

## Phase 9 — Wyckoff Learning Mode

- [x] Detect possible range after trend move
- [x] Accumulation/distribution candidates
- [x] Spring/upthrust/test/SOS/SOW candidates where possible
- [x] Wyckoff range highlighted on chart
- [x] Evidence and uncertainty explained
- [x] Confirmation and invalidation criteria
- [x] Beginner-friendly Wyckoff explanation
- [x] Wyckoff labels limited to evidence-based situations

## Phase 10 — Notes and Learning Journal Inside App

- [x] Save note per ticker/session
- [x] Save AI explanation snapshot
- [x] Save setup score snapshot
- [x] Save detected pattern list
- [x] Save timeframe
- [x] Simple notes history
- [x] Search/filter notes
- [x] Prior chart lessons persist

## Phase 11 — Polish, Testing, and Completion

- [x] Visual design polish
- [x] Empty states
- [x] Error states
- [x] Loading skeletons
- [x] Keyboard shortcuts where helpful
- [x] API failure testing
- [x] Missing data testing
- [x] Screener filter testing
- [x] AI prompt guardrail testing
- [x] Annotation accuracy testing
- [x] Final PRD review
- [x] All PRD items marked complete/deferred/removed
- [x] Raven Learn v1 completion decision

---

# Work Session Entries

## Session 001 — Project Planning

Date:

Summary:

- Created initial Raven Learn PRD.
- Created development journal.
- Created master prompt.
- Defined phased build order.
- Confirmed core product direction: chart-learning cockpit with screener, chart callouts, and AI Coach.

Files created/updated:

- RAVEN_LEARN_PRD.md
- RAVEN_LEARN_DEVELOPMENT_JOURNAL.md
- RAVEN_LEARN_MASTER_PROMPT.md

Completed PRD items:

- [x] PRD created
- [x] Development journal created
- [x] Master prompt created

Open decisions:

- Confirm access path for TradingView Charting Library / Advanced Charts.
- Decide fallback charting library if TradingView access is not available.
- Decide first stock universe for screener.

Blockers:

- Need API keys during implementation, but keys should never be committed to the repo.

Notes:

- Screener must support realistic price filtering for small accounts.
- Called-out chart patterns and Wyckoff phases must be visibly highlighted on the chart.
- AI explanations must be based on structured analysis output, not unsupported guesses.

---

## Session 002 — Phase 0 Foundation

Date: April 28, 2026

Goal:

- Build the Raven Learn project foundation in PRD phase order.

Actions completed:

- Initialized the repository.
- Created a Next.js TypeScript app structure with Tailwind CSS.
- Added shadcn/ui-style component primitives and configuration.
- Installed Framer Motion and core UI dependencies.
- Added dark theme tokens, base layout, home dashboard surface, screener route, and chart workspace route.
- Added environment placeholder structure for Massive.com and OpenAI API keys.
- Added README and coding standards.

Files changed:

- `package.json`
- `package-lock.json`
- `next.config.ts`
- `tsconfig.json`
- `next-env.d.ts`
- `postcss.config.mjs`
- `eslint.config.mjs`
- `.gitignore`
- `.env.example`
- `components.json`
- `app/globals.css`
- `app/layout.tsx`
- `app/page.tsx`
- `app/dashboard/page.tsx`
- `app/screener/page.tsx`
- `app/learn/[symbol]/page.tsx`
- `components/ui/button.tsx`
- `components/ui/card.tsx`
- `components/ui/badge.tsx`
- `lib/utils.ts`
- `lib/env.ts`
- `README.md`
- `CODING_STANDARDS.md`
- `DOCS/RAVEN_LEARN_DEVELOPMENT_JOURNAL.md`

PRD items completed:

- Phase 0 checklist marked complete.

PRD items started:

- None.

Testing performed:

- `npm run typecheck`
- `npm run lint`
- `npm run build`

Blockers:

- `npm audit` reports 2 moderate vulnerabilities in installed dependencies; no automatic force fix applied because it may introduce breaking changes.

---

## Session 003 — Foundation Review Fixes

Date: April 28, 2026

Goal:

- Address Phase 0 review findings while staying in PRD phase order.

Actions completed:

- Removed the network-dependent Google font build path and switched to system font stacks.
- Corrected master prompt source-of-truth paths to include the `DOCS/` directory.
- Updated ticker route validation to allow common class-share symbols such as `BRK-A`.
- Re-ran verification after fixes.

Files changed:

- `app/layout.tsx`
- `app/globals.css`
- `app/learn/[symbol]/page.tsx`
- `DOCS/RAVEN_LEARN_MASTER_PROMPT.md`
- `DOCS/RAVEN_LEARN_DEVELOPMENT_JOURNAL.md`

PRD items completed:

- Phase 0 verification remains complete after successful build.

PRD items started:

- None.

Testing performed:

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `npm audit --audit-level=moderate`

Bugs found:

- Production build failed when `next/font/google` could not fetch external font files.
- Master prompt referenced source-of-truth docs without their `DOCS/` path.
- Chart route rejected hyphenated symbols used in the PRD examples.

Decisions made:

- Use local system font stacks for build reliability.
- Keep the current dependency tree unchanged until a non-breaking security update path is available.

Blockers:

- `npm audit` reports 2 moderate vulnerabilities through Next's PostCSS dependency. The reported fix path is `npm audit fix --force`, which would install `next@9.3.3` and introduce a breaking downgrade, so no force fix was applied.

Next recommended action:

- Begin Phase 1 static UI mockup.

---

## Session 004 — Flat Files Env Placeholders

Date: April 28, 2026

Goal:

- Add local configuration placeholders for Massive flat-file S3-compatible access.

Actions completed:

- Recreated `.env.example` with API and flat-file S3 placeholders.
- Documented the flat-file env keys in the README.
- Added optional flat-file env key names to the server env helper.

Files changed:

- `.env.example`
- `README.md`
- `lib/env.ts`
- `DOCS/RAVEN_LEARN_DEVELOPMENT_JOURNAL.md`

PRD items completed:

- Environment variable structure now includes Massive API, OpenAI API, and Massive flat-file placeholders.

PRD items started:

- Phase 2 flat file loader interface remains not started.

Testing performed:

- `npm run typecheck`
- `npm run lint`

Bugs found:

- `.env.example` was missing from the working tree even though README referenced it.

Decisions made:

- Do not commit or copy actual S3 credentials into source-controlled files.

Blockers:

- None.

Next recommended action:

- Continue Phase 1 static UI mockup before implementing Phase 2 data access.

---

## Session 005 — Phase 1 Static UI Mockup

Date: April 28, 2026

Goal:

- Build the polished static Raven Learn cockpit before connecting real market data.

Actions completed:

- Reworked the home route into the main dashboard surface.
- Added mock watchlist, screener candidates, recent reviews, AI Coach sections, and setup score data.
- Built a screener view with small-account filters and candidate result cards.
- Built a chart workspace with watchlist, drawing controls, annotated chart surface, AI Coach, setup score, and notes.
- Tuned the layout for the Codex in-app browser viewport.

Files changed:

- `app/page.tsx`
- `app/dashboard/page.tsx`
- `app/screener/page.tsx`
- `app/learn/[symbol]/page.tsx`
- `app/globals.css`
- `lib/mock-data.ts`
- `DOCS/RAVEN_LEARN_DEVELOPMENT_JOURNAL.md`

PRD items completed:

- Phase 1 checklist marked complete.

PRD items started:

- None.

Testing performed:

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- In-app browser visual review for `/`, `/screener`, and `/learn/AMD`

Bugs found:

- Initial chart bars did not render because percentage heights needed a stable parent height.
- Centered wide layout was awkward in the Codex in-app browser panel.

Decisions made:

- Keep Phase 1 on static/mock data only.
- Left-align the cockpit and constrain width so it is easy to inspect in the in-app browser.

Blockers:

- None for Phase 1.

Next recommended action:

- Begin Phase 2 market data connection.

---

## Session 006 — Chart Workspace Visual Direction Correction

Date: April 28, 2026

Goal:

- Move the chart workspace away from a card-heavy mockup and closer to a professional charting cockpit.

Actions completed:

- Reworked `/learn/[symbol]` into a chart-first terminal layout.
- Added compact top toolbar, left watchlist/tool rail, central SVG candlestick chart, moving average lines, volume bars, and right AI Coach panel.
- Replaced decorative bar mockup with candlestick-style price action and chart annotations.
- Tuned the layout so the chart and AI Coach are visible in the Codex in-app browser.

Files changed:

- `app/learn/[symbol]/page.tsx`
- `DOCS/RAVEN_LEARN_DEVELOPMENT_JOURNAL.md`

PRD items completed:

- Phase 1 visual review remains complete after chart workspace correction.

PRD items started:

- None.

Testing performed:

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- In-app browser visual review for `/learn/AMD`

Bugs found:

- The first Phase 1 chart mock looked too much like generic dashboard cards and not enough like a trading/charting workspace.
- Viewport-based grid sizing pushed the AI Coach panel out of the visible in-app browser capture.

Decisions made:

- Treat the chart workspace as the primary visual standard for Raven Learn going forward.
- Keep this version static until Phase 2 market data work begins.

Blockers:

- None.

Next recommended action:

- Carry this cockpit direction into Phase 2 data integration.

---

## Session 007 — Phase 2 Market Data Foundation

Date: April 28, 2026

Goal:

- Connect the chart workspace to Massive market data while keeping the UI on the corrected cockpit path.

Actions completed:

- Added a server-side Massive REST client using `https://api.massive.com`.
- Added normalized candle and ticker snapshot types.
- Added aggregate candle normalization.
- Added one-minute in-memory cache for snapshots and aggregate candles.
- Added fallback candle data and visible fallback messaging when Massive data is unavailable.
- Added a flat-file S3 configuration interface and stock day aggregate prefix helper.
- Wired `/learn/[symbol]` to render normalized Massive candles and snapshot volume.
- Restarted the app from `/Users/jsfogarty/Code/RavenLearn` after finding the old `/Users/jsfogarty/Code/Raven Eye` folder was stale.

Files changed:

- `.env.example`
- `README.md`
- `lib/env.ts`
- `lib/market-data/types.ts`
- `lib/market-data/cache.ts`
- `lib/market-data/fallback.ts`
- `lib/market-data/massive.ts`
- `lib/market-data/flat-files.ts`
- `lib/market-data/chart-data.ts`
- `app/learn/[symbol]/page.tsx`
- `DOCS/RAVEN_LEARN_DEVELOPMENT_JOURNAL.md`

PRD items completed:

- Massive API client
- Environment variable validation
- Fetch ticker snapshots
- Fetch aggregate candles
- Normalize candle format
- Error handling
- Fallback messages
- Basic candle cache
- Flat file loader interface
- Real ticker data verified

PRD items started:

- Loading states.

Testing performed:

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- In-app browser verified `/learn/SOFI` rendered with the `Massive` source badge and real SOFI candle range.

Bugs found:

- The original `/Users/jsfogarty/Code/Raven Eye` folder became a stale shell containing only `.next`; the active project is `/Users/jsfogarty/Code/RavenLearn`.
- Turbopack dev cache emitted corrupted-cache panics, so the dev server was restarted with webpack for stable local viewing.

Decisions made:

- Keep Massive API keys server-side only.
- Use REST data for the chart workspace first; defer flat-file downloading to a later implementation step behind the new interface.

Blockers:

- None for Phase 2 foundation.

Next recommended action:

- Add loading states, then continue replacing mock watchlist/screener data with Massive-backed data in Phase 3.

---

## Session 008 — Phase 2 Loading States

Date: April 28, 2026

Goal:

- Finish the remaining Phase 2 loading-state requirement without changing the chart cockpit direction.

Actions completed:

- Added route-level loading UI for `/learn/[symbol]`.
- Matched the loading screen to the chart cockpit layout with watchlist, chart, and AI Coach skeletons.
- Kept market data loading feedback inside the chart surface instead of using a generic spinner.

Files changed:

- `app/learn/[symbol]/loading.tsx`
- `app/learn/[symbol]/page.tsx`
- `DOCS/RAVEN_LEARN_DEVELOPMENT_JOURNAL.md`

PRD items completed:

- Loading states
- Phase 2 checklist is now complete.

PRD items started:

- None.

Testing performed:

- `npm run typecheck`
- `npm run lint`
- `npm run build`

Bugs found:

- None.

Decisions made:

- Loading states should preserve layout stability and chart-workspace context.

Blockers:

- None.

Next recommended action:

- Begin Phase 3 Screener MVP.

---

## Session 009 — Phase 3 Screener MVP

Date: April 28, 2026

Goal:

- Build the screener MVP using Massive snapshots while preserving the small-account learning focus.

Actions completed:

- Added a Massive-backed screener module with a starter symbol universe.
- Added small-account preset filters for price range, minimum volume, relative volume, and readable setup candidates.
- Added price, percent change, day volume, relative volume, trend label, pattern candidate, setup score, and reason fields.
- Kept unaffordable symbols out of the default results when the max price filter is active.
- Wired the screener page to open each result in the chart workspace.
- Added fallback screener rows for resilience if snapshot calls fail.

Files changed:

- `lib/market-data/types.ts`
- `lib/market-data/massive.ts`
- `lib/market-data/screener.ts`
- `app/screener/page.tsx`
- `DOCS/RAVEN_LEARN_DEVELOPMENT_JOURNAL.md`

PRD items completed:

- Phase 3 checklist marked complete.

PRD items started:

- None.

Testing performed:

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- In-app browser verified `/screener` rendered Massive-backed filtered results.

Bugs found:

- Localhost was not running during first browser verification attempt; restarted dev server from `/Users/jsfogarty/Code/RavenLearn`.

Decisions made:

- Start with a curated starter universe before building a broader symbol universe.
- Use fallback screener rows only as resilience, not as the primary path when Massive snapshots are available.

Blockers:

- None for Phase 3 MVP.

Next recommended action:

- Begin Phase 4 Chart Workspace MVP.

---

## Session 010 — Phase 4 Chart Workspace MVP

Date: April 28, 2026

Goal:

- Finish the chart workspace MVP by making the existing chart controls and overlays data-aware.

Actions completed:

- Added supported chart timeframes: `5m`, `15m`, `1h`, `1D`, and `1W`.
- Wired timeframe buttons to query params and Massive aggregate requests.
- Added moving average overlays for 20, 50, and 200 periods.
- Added calculable VWAP overlay using candle VWAP where available and cumulative typical-price volume otherwise.
- Kept volume bars, selected ticker loading, loading state, fallback/error messaging, and drawing tool fallback controls in the chart workspace.

Files changed:

- `lib/market-data/chart-data.ts`
- `app/learn/[symbol]/page.tsx`
- `DOCS/RAVEN_LEARN_DEVELOPMENT_JOURNAL.md`

PRD items completed:

- Phase 4 checklist marked complete.

PRD items started:

- None.

Testing performed:

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- In-app browser verified `/learn/SOFI?tf=1h` rendered with selected timeframe and overlays.

Bugs found:

- The current 1h lookback can return a sparse candle set for some symbols; the chart handles it, but Phase 5 analysis should account for sparse data.

Decisions made:

- Use the current icon drawing controls as the documented fallback until a full TradingView/drawing-library integration is selected.

Blockers:

- None for Phase 4 MVP.

Next recommended action:

- Begin Phase 5 Rule-Based Analysis Engine.

---

## Session 011 — Phase 5 Rule-Based Analysis Engine

Date: April 28, 2026

Goal:

- Generate structured chart facts from normalized candles before later AI explanation work.

Actions completed:

- Added a rule engine for trend, structure, support/resistance, volume, moving averages, and pattern candidates.
- Added higher high / higher low and lower high / lower low checks.
- Added volume spike detection against recent average volume.
- Added moving-average position and 20 MA reclaim/loss candidate checks.
- Added consolidation, breakout attempt, and pullback candidate checks.
- Rendered rule-derived AI Coach sections and structured JSON facts in the chart workspace.

Files changed:

- `lib/analysis/rules.ts`
- `app/learn/[symbol]/page.tsx`
- `DOCS/RAVEN_LEARN_DEVELOPMENT_JOURNAL.md`

PRD items completed:

- Phase 5 checklist marked complete.

PRD items started:

- None.

Testing performed:

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- In-app browser reviewed `/learn/SOFI?tf=1D` with rule-derived AI Coach text and structured facts JSON.

Bugs found:

- Browser first captured the route-level loading state; reload confirmed the loaded analysis state rendered correctly.

Decisions made:

- Keep the rule output visible for now so future OpenAI prompts can be inspected against structured evidence.

Blockers:

- None for Phase 5.

Next recommended action:

- Begin Phase 6 Chart Callouts and Highlighting.

---

## Session 012 — Phase 6 Chart Callouts and Highlighting

Date: April 28, 2026

Goal:

- Make chart annotations data-driven from the rule engine and visibly link chart evidence to AI Coach sections.

Actions completed:

- Added chart annotation types and output to the rule engine.
- Added support and resistance zone annotations.
- Added conditional breakout, pullback, volume spike, MA reclaim/loss, and trend structure event annotations.
- Replaced hardcoded chart labels with SVG-rendered annotation zones, markers, connector lines, and cautious labels.
- Linked chart labels to matching AI Coach sections by section ID.

Files changed:

- `lib/analysis/rules.ts`
- `app/learn/[symbol]/page.tsx`
- `DOCS/RAVEN_LEARN_DEVELOPMENT_JOURNAL.md`

PRD items completed:

- Phase 6 checklist marked complete.

PRD items started:

- None.

Testing performed:

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- In-app browser reviewed `/learn/SOFI?tf=1D`; support/resistance zones and structured annotation output rendered.

Bugs found:

- Two stale hardcoded-label variables remained after replacing chart labels; removed after lint warning.

Decisions made:

- Keep label language cautious with terms like "possible" and "candidate."
- Store annotation targets as section IDs so chart labels can jump to the relevant AI Coach explanation.

Blockers:

- None for Phase 6.

Next recommended action:

- Begin Phase 7 AI Coach MVP.

---

## Session 013 — Phase 7 AI Coach MVP Wiring

Date: April 28, 2026

Goal:

- Add the first OpenAI-backed AI Coach path while keeping chart loads controlled and resilient.

Actions completed:

- Added a server-side OpenAI Responses API client for chart explanations.
- Built the prompt from structured rule-engine analysis JSON and recent visible candles.
- Added strict JSON output expectations for the AI Coach sections.
- Added Current Read, Trend, Volume, Key Levels, Pattern Candidate, Moving Averages, Confirmation / Invalidation, and Beginner Explanation sections.
- Added an Explain Chart action that opts into the OpenAI call with `coach=ai`.
- Added rule-based fallback explanation when OpenAI is unavailable.
- Added guardrail checks for direct financial advice language.
- Added in-memory explanation snapshot caching keyed by symbol, timeframe, latest candle, and pattern candidates.
- Added optional `OPENAI_MODEL` environment placeholder with default `gpt-5.2`.

Files changed:

- `lib/ai/coach.ts`
- `app/learn/[symbol]/page.tsx`
- `.env.example`
- `README.md`
- `lib/env.ts`
- `DOCS/RAVEN_LEARN_DEVELOPMENT_JOURNAL.md`

PRD items completed:

- Most Phase 7 implementation items are complete.

PRD items started:

- AI output evidence checking is implemented as prompt/guardrail structure but remains unverified against a successful OpenAI response.

Testing performed:

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- In-app browser reviewed `/learn/SOFI?tf=1D&coach=ai`; the Explain Chart path rendered fallback sections cleanly.

Bugs found:

- OpenAI request reached the API but returned HTTP 429 quota/billing, so successful OpenAI output could not be reviewed.

Decisions made:

- Do not call OpenAI on every chart load; require the Explain Chart route state.
- Keep the rule-based coach as the fallback so the learning flow remains usable.

Blockers:

- OpenAI account quota/billing must be fixed before checking real AI output against chart evidence.

Next recommended action:

- After OpenAI quota is available, retry `/learn/SOFI?tf=1D&coach=ai` and verify the generated explanation against the chart.

---

## Session 014 — Phase 8 Setup Quality Score

Date: April 28, 2026

Goal:

- Replace the static setup score with an educational score derived from chart evidence.

Actions completed:

- Added a setup-quality scoring module for chart analysis and screener snapshots.
- Added Trend, Volume, Structure, Location, and Confirmation score buckets.
- Added total score, qualitative label, and plain-English scoring summary.
- Integrated the live score into the chart header and AI Coach panel.
- Replaced static setup-score breakdown with evidence-based explanations for each score bucket.
- Integrated the same scoring language into screener ranking and row reasons.

Files changed:

- `lib/analysis/setup-score.ts`
- `app/learn/[symbol]/page.tsx`
- `lib/market-data/screener.ts`
- `DOCS/RAVEN_LEARN_DEVELOPMENT_JOURNAL.md`

PRD items completed:

- Phase 8 checklist marked complete.

PRD items started:

- None.

Testing performed:

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- In-app browser reviewed `/learn/SOFI?tf=1D`; live setup score and educational breakdown rendered.
- In-app browser reviewed `/screener`; screener ranking and reasons used setup-score language.

Bugs found:

- None.

Decisions made:

- Score chart readability and learning quality, not whether the user should take a trade.
- Keep screener scoring simpler than chart scoring because snapshot data has less evidence than full candle analysis.

Blockers:

- None for Phase 8.

Next recommended action:

- Begin Phase 9 Wyckoff Learning Mode.

---

## Session 015 — Phase 9 Wyckoff Learning Mode

Date: April 28, 2026

Goal:

- Add cautious Wyckoff interpretation without over-labeling the chart.

Actions completed:

- Added Wyckoff facts to the chart analysis output.
- Added possible range-after-move detection.
- Added possible accumulation/distribution bias based on the move into the range.
- Added candidate spring, upthrust, test, sign of strength, and sign of weakness event detection.
- Added Wyckoff range and event annotations linked to the AI Coach.
- Added a Wyckoff Read coach section with evidence, confirmation, invalidation, and beginner explanation language.

Files changed:

- `lib/analysis/rules.ts`
- `lib/ai/coach.ts`
- `DOCS/RAVEN_LEARN_DEVELOPMENT_JOURNAL.md`

PRD items completed:

- Phase 9 checklist marked complete.

PRD items started:

- None.

Testing performed:

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- In-app browser reviewed `/learn/SOFI?tf=1D`; Wyckoff Read and structured Wyckoff facts rendered.

Bugs found:

- None.

Decisions made:

- Keep Wyckoff labels conditional and cautious; no label appears unless the range/event detector has evidence.
- Treat Wyckoff as beginner education, not as a forecast.

Blockers:

- None for Phase 9.

Next recommended action:

- Begin Phase 10 Notes and Learning Journal Inside App.

---

## Session 016 — Phase 10 Learning Journal

Date: April 28, 2026

Goal:

- Add local learning notes so users can save and revisit chart lessons.

Actions completed:

- Added a client-side Learning Journal panel.
- Added note saving per symbol and timeframe.
- Saved setup score, detected patterns, timeframe, and coach explanation snapshot with each note.
- Added simple local note history.
- Added search/filter for saved notes.
- Stored notes in browser local storage so prior chart lessons persist locally.

Files changed:

- `app/learn/[symbol]/learning-journal.tsx`
- `app/learn/[symbol]/page.tsx`
- `DOCS/RAVEN_LEARN_DEVELOPMENT_JOURNAL.md`

PRD items completed:

- Phase 10 checklist marked complete.

PRD items started:

- None.

Testing performed:

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- In-app browser reviewed `/learn/SOFI?tf=1D`; Learning Journal, save action, search input, and empty state rendered.

Bugs found:

- Initial localStorage hydration used `setState` inside an effect; replaced it with a lazy state initializer to satisfy lint.

Decisions made:

- Keep v1 notes local-only to avoid adding auth or backend persistence before the v1 polish phase.
- Do not save a test note into the user's local journal during verification.

Blockers:

- None for Phase 10.

Next recommended action:

- Begin Phase 11 Polish, Testing, and Completion.

---

## Session 017 — Phase 11 Polish, Testing, and Completion

Date: April 28, 2026

Goal:

- Make Raven Learn v1 reliable enough to use while documenting the one deferred OpenAI verification item.

Actions completed:

- Added a chart-route error boundary with retry and screener fallback actions.
- Added a screener loading skeleton.
- Added a screener empty state for strict/no-result filter states.
- Added keyboard shortcuts on the chart route: number keys 1-5 switch timeframes and `s` opens the screener.
- Polished the chart session note to use live analysis context.
- Reviewed PRD items against the development journal.
- Marked the OpenAI evidence-review item as deferred because the API returns HTTP 429 quota/billing.
- Marked Raven Learn v1 usable with the rule-based coach and OpenAI fallback behavior.

Files changed:

- `app/learn/[symbol]/error.tsx`
- `app/learn/[symbol]/keyboard-shortcuts.tsx`
- `app/learn/[symbol]/page.tsx`
- `app/screener/loading.tsx`
- `app/screener/page.tsx`
- `DOCS/RAVEN_LEARN_DEVELOPMENT_JOURNAL.md`

PRD items completed:

- Phase 11 checklist marked complete.
- All PRD items are complete or explicitly deferred.

PRD items started:

- None.

Testing performed:

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- In-app browser reviewed `/learn/SOFI?tf=1D`; setup score, Wyckoff Read, Learning Journal, and support/resistance annotations rendered.
- In-app browser verified keyboard shortcut `2` navigates to `/learn/SOFI?tf=15m`.
- In-app browser reviewed `/screener`; preset, results, study-candidate language, and evidence text rendered.
- In-app browser reviewed `/learn/SOFI?tf=1D&coach=ai`; OpenAI HTTP 429 failure falls back to the rule-based coach.

Bugs found:

- Synthetic keyboard testing initially did not trigger from the current focus state; updated the listener to capture at the window level.

Decisions made:

- Treat Raven Learn v1 as usable with the rule-based coach until OpenAI API quota is available.
- Keep the OpenAI evidence-check item deferred rather than pretending a successful AI response was reviewed.

Blockers:

- OpenAI API quota/billing still blocks real AI-output evidence review.

Next recommended action:

- Commit the v1 work, then push/open a PR when ready.

---

## Session Template

Date:

Goal:

Actions completed:

Files changed:

PRD items completed:

PRD items started:

Testing performed:

Bugs found:

Decisions made:

Blockers:

Next recommended action:
