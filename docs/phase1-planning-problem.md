# Phase 1 — Defining the Planning Problem

## Inputs

**Fixed events** — never move: classes, work shifts, appointments, meetings.
Each has a hard start/end time.

**Flexible tasks** — can be placed anywhere that satisfies their constraints:
homework, studying, cleaning, groceries. Each has:
- an estimated duration
- an optional deadline
- a priority (high / medium / low)
- an optional preferred time-of-day
- an optional category (study, chore, errand, etc.)

**User constraints / preferences**:
- wake time, sleep time (hard)
- meal windows (soft by default, can be made hard)
- preferred workout time
- break frequency / max continuous work block
- optional goals, e.g. "at least 1 hour free time," "at least 2 hours studying"

## Outputs

A schedule: an ordered list of blocks, each with start time, end time, task/event
reference, type, priority, location (if relevant), and a short reasoning string
explaining why it was placed there.

Plus, explicitly, a list of **unscheduled tasks** with a reason each couldn't fit.
The planner is allowed — expected — to say "this doesn't all fit," rather than
forcing every task into the day. That's a deliberate design choice, not a bug.

## Constraint classification

| Hard constraints (never violated) | Soft constraints (can flex if needed) |
|---|---|
| Fixed events (class, work, meetings) | Preferred time of day for a task |
| Sleep window | Preferred break length/frequency |
| Explicit deadlines that have passed | Requested "free time" amount |
| | Preferred workout time |

Hard constraints define the feasible region. Soft constraints define what a
*good* schedule looks like within that region — this split is what the
scheduling engine (Phase 4) actually optimizes over.

## High-level architecture

```
                   USER
                     │
                     ▼
              ┌─────────────┐
              │   Web App   │
              └──────┬──────┘
                     │
             Natural Language
                     │
                     ▼
             ┌─────────────┐
             │  AI Parser  │   (LLM: interpretation only, never scheduling)
             └──────┬──────┘
                    │
                    ▼
          ┌───────────────────┐
          │ Structured Tasks  │
          │ Events / Goals    │
          │ Preferences       │
          └─────────┬─────────┘
                    │
                    ▼
          ┌───────────────────┐
          │ Scheduling Engine │   (rule-based → constraint/optimization)
          │ Constraints       │
          │ Priorities        │
          │ Optimization      │
          └─────────┬─────────┘
                    │
                    ▼
              ┌───────────┐
              │ Schedule  │
              └─────┬─────┘
                    │
             ┌──────┴──────┐
             ▼             ▼
       User follows    User changes
       schedule        something
             │             │
             └──────┬──────┘
                    ▼
              REPLANNING
                    │
                    └──────→ new schedule
```

The one rule that matters most: **AI → structured data → scheduling engine →
schedule**, never AI → schedule directly. The LLM's job stops at turning
language into structured `Task`/`Event`/`Preference` objects; the actual
placement decisions are made by deterministic/optimization code that can be
tested, scored, and explained.
