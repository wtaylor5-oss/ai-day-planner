# AI Day Planner

Phase 1 and Phase 2 of the project plan: the planning-problem definition, and
a working (but AI-free) skeleton — data model, forms, and a timeline view.
Everything after this (natural-language parsing, the scheduling engine,
replanning) plugs into what's here.

## What's built

- **Phase 1** — `docs/phase1-planning-problem.md`: inputs/outputs, hard vs.
  soft constraint classification, and the target architecture.
- **Phase 2** — this app:
  - Next.js (App Router) + TypeScript + Tailwind
  - Prisma schema with `Task`, `Event`, `Preferences` models
  - Dashboard showing today's fixed events on a timeline, with a placeholder
    "didn't fit today" section for tasks (this is the seam Phase 4's
    scheduling engine will fill — right now tasks just sit unscheduled until
    something assigns `scheduledStart`/`scheduledEnd`)
  - Add-task form, add-event form, preferences/settings form — all backed by
    real Prisma writes via Next.js server actions, no client-side state
    hacks to unwind later

## What's deliberately *not* here yet

- No natural-language parsing (Phase 3) — forms are structured input for now
- No scheduling engine (Phase 4) — tasks don't get auto-placed
- No auth — single implicit user, `Preferences` is a one-row table

## Running it

```bash
npm install
cp .env.example .env   # point DATABASE_URL at a real Postgres instance
npx prisma migrate dev --name init
npm run dev
```

Then visit `http://localhost:3000`.

## Project structure

```
docs/phase1-planning-problem.md   Phase 1 writeup
prisma/schema.prisma              Task / Event / Preferences models
src/app/page.tsx                  Dashboard (today's timeline)
src/app/tasks/new/page.tsx        Add-task form
src/app/events/new/page.tsx       Add-event form
src/app/settings/page.tsx         Preferences form
src/lib/actions.ts                Server actions (create/update, Prisma writes)
src/lib/prisma.ts                 Prisma client singleton
src/components/Timeline.tsx       Timeline rendering component
```

## Next up (Phase 3+)

1. LLM-backed parser: natural language → `Task`/`Event` JSON, validated
   against the Prisma schema shapes above before writing.
2. Rule-based scheduler that fills `scheduledStart`/`scheduledEnd` on
   `Task`, respecting the hard/soft constraint split from Phase 1.
3. Swap the dashboard's placeholder "didn't fit today" logic for the real
   output of that scheduler.
