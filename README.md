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

- **Phase 3** — `docs/phase3-structured-input.md`: pivoted away from
  LLM-based natural-language parsing to structured input, to avoid an API
  dependency/cost with no real gain in planning quality. See that doc for
  the reasoning and what it means for the project's "AI" framing.
  - Add Task form now captures `earliestStart`/`latestEnd` (a time window)
    plus a hard/soft toggle (`windowIsHard`) for that window
  - The form validates the window is long enough for the task's duration
    before saving

## What's deliberately *not* here yet

- No scheduling engine (Phase 4) — tasks don't get auto-placed; tasks sit
  in "didn't fit today" until something sets `scheduledStart`/`scheduledEnd`
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
docs/phase3-structured-input.md   Phase 3 writeup (the NL-parsing pivot)
prisma/schema.prisma              Task / Event / Preferences models
src/app/page.tsx                  Dashboard (today's timeline)
src/app/tasks/new/page.tsx        Add-task form, incl. time window + hard/soft toggle
src/app/events/new/page.tsx       Add-event form
src/app/settings/page.tsx         Preferences form
src/lib/actions.ts                Server actions (create/update, Prisma writes)
src/lib/prisma.ts                 Prisma client singleton
src/components/Timeline.tsx       Timeline rendering component
```

## Next up (Phase 4+)

1. Rule-based scheduler that fills `scheduledStart`/`scheduledEnd` on
   `Task`, respecting the hard/soft constraint split from Phase 1 — including
   the new `windowIsHard` flag.
2. Swap the dashboard's placeholder "didn't fit today" logic for the real
   output of that scheduler.
3. Build the evaluation harness (Phase 5) against the scheduler directly —
   constraint satisfaction scenarios, since there's no parser to eval anymore.
