import { prisma } from "@/lib/prisma";
import Timeline from "@/components/Timeline";

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function endOfToday() {
  const d = new Date();
  d.setHours(23, 59, 59, 999);
  return d;
}

export default async function DashboardPage() {
  const from = startOfToday();
  const to = endOfToday();

  const [events, tasks] = await Promise.all([
    prisma.event.findMany({
      where: { startTime: { gte: from, lte: to } },
      orderBy: { startTime: "asc" },
    }),
    prisma.task.findMany({
      where: { completed: false },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  const eventBlocks = events.map((e) => ({
    id: e.id,
    title: e.title,
    start: e.startTime,
    end: e.endTime,
    kind: "event" as const,
    location: e.location,
  }));

  // Until the scheduling engine (Phase 4) exists, only tasks the user has
  // manually placed (scheduledStart/scheduledEnd set) show on the timeline.
  // Everything else falls into "didn't fit today" as a placeholder — this
  // is the seam where Phase 4 plugs in.
  const scheduledTaskBlocks = tasks
    .filter((t) => t.scheduledStart && t.scheduledEnd)
    .map((t) => ({
      id: t.id,
      title: t.title,
      start: t.scheduledStart as Date,
      end: t.scheduledEnd as Date,
      kind: "task" as const,
      location: t.location,
    }));

  const unscheduled = tasks
    .filter((t) => !t.scheduledStart || !t.scheduledEnd)
    .map((t) => ({
      id: t.id,
      title: t.title,
      durationMin: t.durationMin,
      reasoning: t.reasoning ?? "not yet scheduled — engine not built (Phase 4)",
    }));

  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <p className="mb-1 text-xs uppercase tracking-wide text-ink/50">Today</p>
      <h1 className="mb-6 text-2xl font-semibold">{today}</h1>
      <Timeline
        blocks={[...eventBlocks, ...scheduledTaskBlocks]}
        unscheduled={unscheduled}
      />
    </div>
  );
}
