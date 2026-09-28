import { createEvent } from "@/lib/actions";

export default function NewEventPage() {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="max-w-md">
      <h1 className="mb-1 text-2xl font-semibold">Add an event</h1>
      <p className="mb-6 text-sm text-ink/60">
        Fixed commitments the planner will never schedule over — class, work,
        appointments, meetings.
      </p>

      <form action={createEvent} className="space-y-5">
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            name="title"
            required
            placeholder="CS Lecture"
            className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="date">
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
            defaultValue={today}
            className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="startTime">
              Start
            </label>
            <input
              id="startTime"
              name="startTime"
              type="time"
              required
              className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="endTime">
              End
            </label>
            <input
              id="endTime"
              name="endTime"
              type="time"
              required
              className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm outline-none focus:border-accent"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="location">
            Location (optional)
          </label>
          <input
            id="location"
            name="location"
            placeholder="Room 204"
            className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>

        <button
          type="submit"
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent/90"
        >
          Add event
        </button>
      </form>
    </div>
  );
}
