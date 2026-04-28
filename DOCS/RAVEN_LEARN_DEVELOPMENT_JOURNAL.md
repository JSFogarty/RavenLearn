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
- [ ] Loading states
- [x] Fallback messages
- [x] Basic candle cache
- [x] Flat file loader interface
- [x] Real ticker data verified

## Phase 3 — Screener MVP

- [ ] Price range filter
- [ ] Minimum volume filter
- [ ] Percent change filter
- [ ] Relative volume if available/calculable
- [ ] Watchlist or symbol universe selection
- [ ] Exclude unrealistic high-priced symbols by default
- [ ] Reason each symbol appeared
- [ ] Basic trend label
- [ ] Small-account default preset
- [ ] Open chart from screener result

## Phase 4 — Chart Workspace MVP

- [ ] Load selected ticker into chart
- [ ] Candlestick display
- [ ] Timeframe selector
- [ ] Volume display
- [ ] 20 MA
- [ ] 50 MA
- [ ] 200 MA
- [ ] VWAP if available/calculable
- [ ] Chart loading/error states
- [ ] Drawing tools available or fallback documented

## Phase 5 — Rule-Based Analysis Engine

- [ ] Trend detection
- [ ] Higher high / higher low detection
- [ ] Lower high / lower low detection
- [ ] Support/resistance detection
- [ ] Volume spike detection
- [ ] Moving average position analysis
- [ ] Moving average reclaim/loss detection
- [ ] Consolidation/range detection
- [ ] Breakout attempt detection
- [ ] Pullback detection
- [ ] Structured JSON analysis output
- [ ] Analysis output reviewed for accuracy

## Phase 6 — Chart Callouts and Highlighting

- [ ] Annotation engine
- [ ] Support/resistance zones highlighted
- [ ] Breakout areas highlighted
- [ ] Pullback zones highlighted
- [ ] Volume spikes marked
- [ ] MA reclaim/loss events marked
- [ ] Trend structure labeled
- [ ] Chart labels linked to AI Coach sections
- [ ] Cautious labels used
- [ ] Every called-out pattern/phase visibly highlighted

## Phase 7 — AI Coach MVP

- [ ] OpenAI API client
- [ ] Structured prompt from analysis JSON
- [ ] Current Read section
- [ ] Trend explanation
- [ ] Volume explanation
- [ ] Key Levels explanation
- [ ] Pattern Candidate explanation
- [ ] Confirmation/Invalidation section
- [ ] Beginner Explanation
- [ ] Direct financial advice language avoided
- [ ] Explanation snapshot saved
- [ ] AI output checked against chart evidence

## Phase 8 — Setup Quality Score

- [ ] Trend score
- [ ] Volume/activity score
- [ ] Structure score
- [ ] Location/risk clarity score
- [ ] Confirmation score
- [ ] Total score
- [ ] Score explanation
- [ ] Screener integration
- [ ] Chart panel integration
- [ ] Score reviewed to ensure it teaches rather than signals trades

## Phase 9 — Wyckoff Learning Mode

- [ ] Detect possible range after trend move
- [ ] Accumulation/distribution candidates
- [ ] Spring/upthrust/test/SOS/SOW candidates where possible
- [ ] Wyckoff range highlighted on chart
- [ ] Evidence and uncertainty explained
- [ ] Confirmation and invalidation criteria
- [ ] Beginner-friendly Wyckoff explanation
- [ ] Wyckoff labels limited to evidence-based situations

## Phase 10 — Notes and Learning Journal Inside App

- [ ] Save note per ticker/session
- [ ] Save AI explanation snapshot
- [ ] Save setup score snapshot
- [ ] Save detected pattern list
- [ ] Save timeframe
- [ ] Simple notes history
- [ ] Search/filter notes
- [ ] Prior chart lessons persist

## Phase 11 — Polish, Testing, and Completion

- [ ] Visual design polish
- [ ] Empty states
- [ ] Error states
- [ ] Loading skeletons
- [ ] Keyboard shortcuts where helpful
- [ ] API failure testing
- [ ] Missing data testing
- [ ] Screener filter testing
- [ ] AI prompt guardrail testing
- [ ] Annotation accuracy testing
- [ ] Final PRD review
- [ ] All PRD items marked complete/deferred/removed
- [ ] Raven Learn v1 completion decision

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

- Loading states remain open.

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

- Phase 2 loading states still need implementation.

Next recommended action:

- Add loading states, then continue replacing mock watchlist/screener data with Massive-backed data in Phase 3.

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
