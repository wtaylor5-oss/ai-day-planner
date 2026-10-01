"use server";

import { prisma } from "@/lib/prisma";
import { Priority, TaskCategory } from "@prisma/client";
import { redirect } from "next/navigation";

function timeToday(timeHHMM: string): Date {
  const [h, m] = timeHHMM.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
}

export async function createTask(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const durationMin = Number(formData.get("durationMin") ?? 0);
  const priority = String(formData.get("priority") ?? "MEDIUM") as Priority;
  const category = String(formData.get("category") ?? "OTHER") as TaskCategory;
  const deadlineRaw = String(formData.get("deadline") ?? "");
  const preferredTime = String(formData.get("preferredTime") ?? "") || null;
  const earliestStartRaw = String(formData.get("earliestStart") ?? "");
  const latestEndRaw = String(formData.get("latestEnd") ?? "");
  const windowIsHard = formData.get("windowIsHard") === "on";

  if (!title || durationMin <= 0) {
    throw new Error("Task needs a title and a duration greater than zero.");
  }

  if (earliestStartRaw && latestEndRaw) {
    const windowMinutes =
      timeToday(latestEndRaw).getTime() / 60000 -
      timeToday(earliestStartRaw).getTime() / 60000;
    if (windowMinutes < durationMin) {
      throw new Error(
        `The window you gave (${earliestStartRaw}–${latestEndRaw}) is shorter than the task's duration (${durationMin} min). Widen the window or shorten the task.`
      );
    }
  }

  await prisma.task.create({
    data: {
      title,
      durationMin,
      priority,
      category,
      deadline: deadlineRaw ? new Date(deadlineRaw) : null,
      preferredTime,
      earliestStart: earliestStartRaw ? timeToday(earliestStartRaw) : null,
      latestEnd: latestEndRaw ? timeToday(latestEndRaw) : null,
      windowIsHard,
    },
  });

  redirect("/");
}

export async function createEvent(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const date = String(formData.get("date") ?? "");
  const startTime = String(formData.get("startTime") ?? "");
  const endTime = String(formData.get("endTime") ?? "");
  const location = String(formData.get("location") ?? "") || null;

  if (!title || !date || !startTime || !endTime) {
    throw new Error("Event needs a title, date, start time, and end time.");
  }

  await prisma.event.create({
    data: {
      title,
      startTime: new Date(`${date}T${startTime}`),
      endTime: new Date(`${date}T${endTime}`),
      location,
    },
  });

  redirect("/");
}

export async function updatePreferences(formData: FormData) {
  const wakeTime = String(formData.get("wakeTime") ?? "07:30");
  const sleepTime = String(formData.get("sleepTime") ?? "23:00");
  const preferredStudyTime = String(formData.get("preferredStudyTime") ?? "morning");
  const preferredWorkoutTime = String(formData.get("preferredWorkoutTime") ?? "evening");
  const breakFrequencyMin = Number(formData.get("breakFrequencyMin") ?? 50);
  const breakLengthMin = Number(formData.get("breakLengthMin") ?? 10);
  const maxContinuousWorkMin = Number(formData.get("maxContinuousWorkMin") ?? 90);

  const existing = await prisma.preferences.findFirst();

  const data = {
    wakeTime,
    sleepTime,
    preferredStudyTime,
    preferredWorkoutTime,
    breakFrequencyMin,
    breakLengthMin,
    maxContinuousWorkMin,
  };

  if (existing) {
    await prisma.preferences.update({ where: { id: existing.id }, data });
  } else {
    await prisma.preferences.create({ data });
  }

  redirect("/settings");
}
