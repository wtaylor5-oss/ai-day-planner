type Block = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  kind: "event" | "task";
  location?: string | null;
};

function formatTime(d: Date) {
  return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export default function Timeline({
  blocks,
  unscheduled,
}: {
  blocks: Block[];
  unscheduled: { id: string; title: string; durationMin: number; reasoning?: string | null }[];
}) {
  const sorted = [...blocks].sort((a, b) => a.start.getTime() - b.start.getTime());

  if (sorted.length === 0 && unscheduled.length === 0) {
    return (
      <p className="text-sm text-ink/60">
        Nothing on today's schedule yet. Add a task or event to get started.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      <ol className="timeline-track space-y-4 pl-5">
        {sorted.map((block) => (
          <li key={block.id} className="relative">
            <span className="absolute -left-[27px] top-1.5 h-2 w-2 rounded-full bg-accent" />
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <p className="font-medium">{block.title}</p>
                {block.location && (
                  <p className="text-xs text-ink/50">{block.location}</p>
                )}
              </div>
              <p className="whitespace-nowrap text-sm text-ink/60">
                {formatTime(block.start)} – {formatTime(block.end)}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {unscheduled.length > 0 && (
        <div className="rounded-md border border-warn/30 bg-warn/5 p-4">
          <p className="mb-2 text-sm font-medium text-warn">
            Didn't fit today
          </p>
          <ul className="space-y-1 text-sm text-ink/70">
            {unscheduled.map((t) => (
              <li key={t.id}>
                {t.title} — {t.durationMin} min
                {t.reasoning ? ` · ${t.reasoning}` : ""}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
