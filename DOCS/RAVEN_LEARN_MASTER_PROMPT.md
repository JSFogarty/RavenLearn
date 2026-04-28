# Raven Learn — Master Build Prompt for Coding Agent

You are building **Raven Learn**, a stock-trade learning web app.

The goal is to create a beautiful TradingView-style chart-learning cockpit that feels like sitting beside a professional trader who pauses the chart and explains what is happening.

Raven Learn is not a trading bot, not a broker, and not a paper-trading app in v1. It is an educational chart analysis and learning tool.

## Source of Truth

Use these files as the source of truth:

1. `DOCS/RAVEN_LEARN_PRD.md`
2. `DOCS/RAVEN_LEARN_DEVELOPMENT_JOURNAL.md`
3. `DOCS/RAVEN_LEARN_MASTER_PROMPT.md`

You must build in PRD phase order.

Do not skip ahead unless a dependency requires it.

After completing any action, update the development journal and mark the relevant PRD checklist items.

The project is not complete until every PRD item is marked one of:

- Complete
- Deferred
- Removed by decision

## Product Vision

Raven Learn should help users understand:

- What is happening on a stock chart
- Why it may be happening
- What evidence supports the interpretation
- What would confirm the idea
- What would invalidate the idea
- Whether the stock is active and realistic for their account size

The app should be visually polished, dark themed, and inspired by professional charting platforms.

## Critical Experience Requirement

The app should feel like:

> Sitting beside a professional trader who pauses the chart and explains what is happening.

This means explanations must be calm, clear, visual, and evidence-based.

## Data Requirements

Use Massive.com for market data.

Environment variables must be used. Never hardcode API keys.

Expected env vars:

```env
MASSIVE_API_KEY=
OPENAI_API_KEY=
```

Use Massive API for current/recent data and snapshots.
Use Massive flat files for historical data support.

Use OpenAI API for AI explanations.

Important pipeline:

```text
Massive data → normalized candles → indicators → rule engine → structured chart summary → OpenAI explanation → chart annotations + AI Coach panel
```

Do not ask AI to invent chart facts. The app should calculate facts first, then ask AI to explain those facts.

## Build Order

Follow this order exactly unless a technical dependency forces a small adjustment.

### Phase 0 — Project Setup and Foundation

Build project foundation:

- Next.js
- TypeScript
- Tailwind
- shadcn/ui
- Framer Motion
- Dark theme
- Base layout
- Env structure
- README
- PRD
- Journal
- Master prompt
- Basic routes

Stop and update journal.

### Phase 1 — Beautiful Static UI Mockup

Build a polished static mockup using mock data:

- Dashboard
- Watchlist
- Screener panel
- Chart workspace placeholder
- AI Coach panel
- Notes panel
- Top navigation
- Dark TradingView-inspired design

Stop and update journal.

### Phase 2 — Market Data Connection

Connect Massive.com:

- API client
- Env validation
- Fetch snapshots
- Fetch aggregate candles
- Normalize candle data
- Error/loading states
- Candle cache
- Flat file loader interface

Stop and update journal.

### Phase 3 — Screener MVP

Build light screener.

Must include:

- Price range filter
- Minimum volume
- Percent change
- Relative volume if possible
- Small-account preset
- Reason each symbol appeared
- Basic trend label
- Avoid unaffordable stocks when price filter is active

Important example:

If user has $50 or sets max price to $50, do not return BRK-A or other unrealistic high-priced symbols.

Stop and update journal.

### Phase 4 — Chart Workspace MVP

Build chart workspace:

- Ticker selection
- Candlestick chart
- Timeframes
- Volume
- 20 MA
- 50 MA
- 200 MA
- VWAP if available/calculable
- Drawing tools using TradingView if possible

Stop and update journal.

### Phase 5 — Rule-Based Analysis Engine

Build chart analysis engine:

- Trend detection
- Higher highs/lows
- Lower highs/lows
- Support/resistance
- Volume spikes
- MA position
- MA reclaim/loss
- Consolidation/range
- Breakout attempt
- Pullback
- Structured JSON output

Stop and update journal.

### Phase 6 — Chart Callouts and Highlighting

Build visual chart annotation system.

Critical requirement:

> When a pattern, Wyckoff phase, support/resistance zone, breakout, pullback, MA event, or volume event is called out, it must be clearly highlighted on the chart.

Use cautious labels:

- Possible
- Candidate
- Potential
- Needs confirmation

Do not use guaranteed prediction language.

Stop and update journal.

### Phase 7 — AI Coach MVP

Build OpenAI explanation system.

Required AI Coach sections:

1. Current Read
2. Trend
3. Volume
4. Key Levels
5. Pattern Candidate
6. Wyckoff Context if detected
7. Moving Averages
8. What Supports This Read
9. What Would Confirm It
10. What Would Invalidate It
11. Beginner Explanation
12. Risk/Education Note

Avoid direct financial advice. Do not say “buy,” “sell,” or “guaranteed.”

Stop and update journal.

### Phase 8 — Setup Quality Score

Build educational score:

- Trend: 0–20
- Volume/activity: 0–20
- Structure: 0–20
- Location/risk clarity: 0–20
- Confirmation: 0–20

Total: 0–100

Score must include a visible breakdown and explanation.

Stop and update journal.

### Phase 9 — Wyckoff Learning Mode

Build cautious Wyckoff mode:

- Possible accumulation
- Possible distribution
- Spring candidate
- Upthrust candidate
- Test candidate
- Sign of strength/weakness candidate
- Markup/markdown

Highlight the suspected Wyckoff range on chart.
Explain evidence, uncertainty, confirmation, and invalidation.

Stop and update journal.

### Phase 10 — Notes and Learning Journal Inside App

Build user notes:

- Save note per ticker/session
- Save AI explanation snapshot
- Save setup score snapshot
- Save detected patterns
- Save timeframe
- Notes history
- Search/filter

Stop and update journal.

### Phase 11 — Polish, Testing, and Completion

Polish and test:

- Visual polish
- Empty states
- Error states
- Loading skeletons
- API failures
- Missing data
- Screener filters
- AI guardrails
- Annotation accuracy
- Final PRD review

Stop and update journal.

## UI Style Direction

Use a dark, professional trading-terminal feel:

- Deep charcoal/black background
- Subtle borders
- Soft glow accents
- Clean typography
- High information density without clutter
- Smooth transitions
- Modern dashboard cards
- Visual hierarchy like a serious professional tool

The app should be beautiful before it becomes complex.

## Screener Philosophy

The screener should help the user find active and realistic stocks to study or trade.

The screener is not a signal generator.

It should answer:

- Is this stock active?
- Is it inside my price range?
- Is volume strong enough?
- Is something interesting happening on the chart?
- Why did this symbol appear?

## Chart Analysis Philosophy

The app should never just label a pattern without explaining why.

Every detected structure should include:

- What was detected
- Where it is on the chart
- Why it matters
- What evidence supports it
- What would confirm it
- What would invalidate it

## AI Prompting Rules

AI must receive structured chart facts.

AI should explain, not invent.

AI output should be educational and cautious.

Forbidden style:

- “Buy now”
- “This will run”
- “Guaranteed breakout”
- “You should enter here”

Preferred style:

- “This may suggest…”
- “A trader might watch for…”
- “This needs confirmation…”
- “The chart evidence supporting this is…”

## Development Rules

- Build in small working increments.
- Keep code modular.
- Use TypeScript types.
- Keep API keys out of source control.
- Update journal after each meaningful change.
- Do not mark PRD items complete until verified.
- Favor simple reliable features over complex unfinished systems.
- Keep v1 focused on learning, charts, screener, annotations, and AI explanations.

## Immediate First Task

Start with Phase 0.

1. Inspect the repo.
2. Create or verify the app foundation.
3. Add required docs if missing.
4. Add env example.
5. Add base folder structure.
6. Run the app locally.
7. Update the development journal.

Do not begin Phase 1 until Phase 0 is complete.
