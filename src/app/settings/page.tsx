import { prisma } from "@/lib/prisma";
import { updatePreferences } from "@/lib/actions";

export default async function SettingsPage() {
  const prefs = await prisma.preferences.findFirst();

  return (
    <div className="max-w-md">
      <h1 className="mb-1 text-2xl font-semibold">Preferences</h1>
      <p className="mb-6 text-sm text-ink/60">
        These are soft constraints — the scheduling engine will try to honor
        them, but can flex if the day doesn't fit otherwise.
      </p>

      <form action={updatePreferences} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="wakeTime">
              Wake time
            </label>
            <input
              id="wakeTime"
              name="wakeTime"
              type="time"
              defaultValue={prefs?.wakeTime ?? "07:30"}
              className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="sleepTime">
              Sleep time
            </label>
            <input
              id="sleepTime"
              name="sleepTime"
              type="time"
              defaultValue={prefs?.sleepTime ?? "23:00"}
              className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm outline-none focus:border-accent"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="preferredStudyTime">
              Preferred study time
            </label>
            <select
              id="preferredStudyTime"
              name="preferredStudyTime"
              defaultValue={prefs?.preferredStudyTime ?? "morning"}
              className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm outline-none focus:border-accent"
            >
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="preferredWorkoutTime">
              Preferred workout time
            </label>
            <select
              id="preferredWorkoutTime"
              name="preferredWorkoutTime"
              defaultValue={prefs?.preferredWorkoutTime ?? "evening"}
              className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm outline-none focus:border-accent"
            >
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="breakFrequencyMin">
              Work before break (min)
            </label>
            <input
              id="breakFrequencyMin"
              name="breakFrequencyMin"
              type="number"
              min={15}
              step={5}
              defaultValue={prefs?.breakFrequencyMin ?? 50}
              className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="breakLengthMin">
              Break length (min)
            </label>
            <input
              id="breakLengthMin"
              name="breakLengthMin"
              type="number"
              min={5}
              step={5}
              defaultValue={prefs?.breakLengthMin ?? 10}
              className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="maxContinuousWorkMin">
              Max continuous work (min)
            </label>
            <input
              id="maxContinuousWorkMin"
              name="maxContinuousWorkMin"
              type="number"
              min={15}
              step={5}
              defaultValue={prefs?.maxContinuousWorkMin ?? 90}
              className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm outline-none focus:border-accent"
            />
          </div>
        </div>

        <button
          type="submit"
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent/90"
        >
          Save preferences
        </button>
      </form>
    </div>
  );
}
