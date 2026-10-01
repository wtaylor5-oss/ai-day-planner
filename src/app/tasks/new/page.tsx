import { createTask } from "@/lib/actions";

export default function NewTaskPage() {
  return (
    <div className="max-w-md">
      <h1 className="mb-1 text-2xl font-semibold">Add a task</h1>
      <p className="mb-6 text-sm text-ink/60">
        Flexible work the planner can place anywhere it fits — studying, chores,
        errands, assignments.
      </p>

      <form action={createTask} className="space-y-5">
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            name="title"
            required
            placeholder="Study chemistry"
            className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="durationMin">
              Duration (minutes)
            </label>
            <input
              id="durationMin"
              name="durationMin"
              type="number"
              min={5}
              step={5}
              required
              defaultValue={60}
              className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="priority">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              defaultValue="MEDIUM"
              className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm outline-none focus:border-accent"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              name="category"
              defaultValue="OTHER"
              className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm outline-none focus:border-accent"
            >
              <option value="STUDY">Study</option>
              <option value="WORK">Work</option>
              <option value="CHORE">Chore</option>
              <option value="ERRAND">Errand</option>
              <option value="EXERCISE">Exercise</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="preferredTime">
              Preferred time
            </label>
            <select
              id="preferredTime"
              name="preferredTime"
              defaultValue=""
              className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm outline-none focus:border-accent"
            >
              <option value="">No preference</option>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="deadline">
            Deadline (optional)
          </label>
          <input
            id="deadline"
            name="deadline"
            type="date"
            className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>

        <div className="rounded-md border border-line bg-white p-4">
          <p className="mb-1 text-sm font-medium">Time window (optional)</p>
          <p className="mb-3 text-xs text-ink/50">
            Restrict today when this can happen — e.g. "can't start before
            noon." Leave blank for no restriction.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs text-ink/60" htmlFor="earliestStart">
                Earliest start
              </label>
              <input
                id="earliestStart"
                name="earliestStart"
                type="time"
                className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-ink/60" htmlFor="latestEnd">
                Latest end
              </label>
              <input
                id="latestEnd"
                name="latestEnd"
                type="time"
                className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm outline-none focus:border-accent"
              />
            </div>
          </div>
          <label className="mt-3 flex items-center gap-2 text-xs text-ink/70">
            <input type="checkbox" name="windowIsHard" className="rounded border-line" />
            This window is a hard constraint — never schedule outside it
            (leave unchecked for a soft preference the scheduler can flex on)
          </label>
        </div>

        <button
          type="submit"
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent/90"
        >
          Add task
        </button>
      </form>
    </div>
  );
}
