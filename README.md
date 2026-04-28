# Raven Learn

Raven Learn is a dark, TradingView-inspired stock chart learning cockpit. The product is educational: it helps users understand chart evidence, trend, volume, key levels, and setup quality without acting as a broker, bot, or paper-trading simulator.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create a local environment file:

```bash
cp .env.example .env.local
```

3. Add API keys when needed:

```env
MASSIVE_API_KEY=
MASSIVE_API_BASE_URL=https://api.massive.com
OPENAI_API_KEY=
MASSIVE_FLATFILES_ACCESS_KEY_ID=
MASSIVE_FLATFILES_SECRET_ACCESS_KEY=
MASSIVE_FLATFILES_ENDPOINT=
MASSIVE_FLATFILES_BUCKET=flatfiles
```

4. Start the app:

```bash
npm run dev
```

## Product Source of Truth

- `DOCS/RAVEN_LEARN_PRD.md`
- `DOCS/RAVEN_LEARN_DEVELOPMENT_JOURNAL.md`
- `DOCS/RAVEN_LEARN_MASTER_PROMPT.md`

Development follows the PRD phase order. After each work session, update the development journal and mark completed checklist items.

## Phase Status

Phase 0 establishes the Next.js, TypeScript, Tailwind, shadcn/ui-style primitives, Framer Motion dependency, dark theme, routes, environment placeholders, and base layout.
