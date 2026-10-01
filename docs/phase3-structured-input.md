# Phase 3 — Structured Input (Pivot from Natural Language)

## What changed from the original plan

The original Phase 3 called for an LLM to parse free-text input ("study
chemistry for 2 hours before Friday") into structured `Task`/`Event` data.
This build skips that and goes straight to structured input: the forms
built in Phase 2 are extended to capture the full constraint set directly,
rather than inferring it from language.

## Why

Two reasons, in order of how much they actually mattered:

1. **It removes a dependency and a cost** for no loss of planning
   capability — an LLM parser doesn't make the *schedule* any smarter, it
   only changes how constraints get into the system. The scheduling engine
   (Phase 4) doesn't care whether a `Task`'s `earliestStart` came from a
   parsed sentence or a form field.
2. **It's more reliable for a demo.** Structured input can't misread "before
   Friday" as the wrong Friday, or silently drop a constraint the model
   didn't extract. For a project whose centerpiece is "the planner respects
   constraints," having the constraints enter the system exactly as typed
   removes a whole category of failure that has nothing to do with the
   scheduling logic itself.

## What this means for the "AI" in "AI Day Planner"

The AI case for this project now rests entirely on the scheduling engine —
constraint satisfaction and optimization over a search space (Phase 4) —
rather than on an LLM call. That's a legitimate, defensible framing:
constraint-based planning is a long-standing area of AI research in its own
right, independent of LLMs. If natural-language input is worth adding later,
it's a clean addition on top of this — the forms already produce exactly the
structured shape a parser would need to target, so nothing here needs to be
reworked to add it back.

## What was added to the data model

`Task.earliestStart` and `Task.latestEnd` (already present in the schema)
are now exposed directly in the Add Task form, alongside a new field:

- **`windowIsHard`** (boolean, default `false`) — whether the
  earliest-start/latest-end window is a hard constraint (never violated) or
  a soft preference (the scheduler can flex on it if the day doesn't
  otherwise fit). This makes the hard/soft distinction from Phase 1 — which
  previously only existed conceptually — something the user actually sets
  per task.

The form also validates that the stated window is at least as long as the
task's duration before saving, so an impossible constraint (a 2-hour task in
a 1-hour window) gets caught at entry time rather than surfacing later as a
confusing "this doesn't fit" from the scheduler.
