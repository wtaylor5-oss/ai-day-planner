-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "TaskCategory" AS ENUM ('STUDY', 'WORK', 'CHORE', 'ERRAND', 'EXERCISE', 'OTHER');

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "durationMin" INTEGER NOT NULL,
    "priority" "Priority" NOT NULL DEFAULT 'MEDIUM',
    "category" "TaskCategory" NOT NULL DEFAULT 'OTHER',
    "deadline" TIMESTAMP(3),
    "earliestStart" TIMESTAMP(3),
    "latestEnd" TIMESTAMP(3),
    "preferredTime" TEXT,
    "location" TEXT,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "scheduledStart" TIMESTAMP(3),
    "scheduledEnd" TIMESTAMP(3),
    "reasoning" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "location" TEXT,
    "recurring" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Preferences" (
    "id" TEXT NOT NULL,
    "wakeTime" TEXT NOT NULL DEFAULT '07:30',
    "sleepTime" TEXT NOT NULL DEFAULT '23:00',
    "preferredStudyTime" TEXT NOT NULL DEFAULT 'morning',
    "preferredWorkoutTime" TEXT NOT NULL DEFAULT 'evening',
    "breakFrequencyMin" INTEGER NOT NULL DEFAULT 50,
    "breakLengthMin" INTEGER NOT NULL DEFAULT 10,
    "maxContinuousWorkMin" INTEGER NOT NULL DEFAULT 90,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Preferences_pkey" PRIMARY KEY ("id")
);
