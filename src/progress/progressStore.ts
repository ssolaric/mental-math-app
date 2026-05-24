import type { RoundSummary } from "../hooks/useRound";
import type { GameProgress, Operation, OperationStats } from "../types";
import { browserStorageAdapter, type ProgressStorage } from "./storageAdapter";

const createEmptyOperationStats = (): OperationStats => ({
  totalAttempts: 0,
  correctAnswers: 0,
  bestScore: 0,
  bestStreak: 0,
  averageTime: 0,
  lastPlayed: 0,
});

export const createEmptyGameProgress = (): GameProgress => ({
  totalProblems: 0,
  totalCorrect: 0,
  allTimeStreak: 0,
  stats: {
    addition: createEmptyOperationStats(),
    subtraction: createEmptyOperationStats(),
    multiplication: createEmptyOperationStats(),
    division: createEmptyOperationStats(),
  },
});

export const applyRoundToProgress = (
  progress: GameProgress,
  operation: Operation,
  summary: RoundSummary,
): GameProgress => {
  const opStats = progress.stats[operation];
  const avgMsForRound =
    summary.total > 0 ? summary.elapsedMs / summary.total : 0;
  const newTotal = opStats.totalAttempts + summary.total;
  const blendedAvg =
    opStats.totalAttempts === 0
      ? avgMsForRound
      : (opStats.averageTime * opStats.totalAttempts +
          avgMsForRound * summary.total) /
        newTotal;

  return {
    ...progress,
    totalProblems: progress.totalProblems + summary.total,
    totalCorrect: progress.totalCorrect + summary.correct,
    allTimeStreak: Math.max(progress.allTimeStreak, summary.bestStreak),
    stats: {
      ...progress.stats,
      [operation]: {
        totalAttempts: newTotal,
        correctAnswers: opStats.correctAnswers + summary.correct,
        bestScore: Math.max(opStats.bestScore, summary.score),
        bestStreak: Math.max(opStats.bestStreak, summary.bestStreak),
        averageTime: blendedAvg,
        lastPlayed: Date.now(),
      },
    },
  };
};

let storage: ProgressStorage = browserStorageAdapter;
let snapshot: GameProgress = readInitial();
const subscribers = new Set<() => void>();

function readInitial(): GameProgress {
  return storage.read() ?? createEmptyGameProgress();
}

function emit(): void {
  for (const fn of subscribers) fn();
}

export const configureProgressStorage = (adapter: ProgressStorage): void => {
  storage = adapter;
  snapshot = readInitial();
  emit();
};

export const getProgress = (): GameProgress => snapshot;

export const subscribeProgress = (listener: () => void): (() => void) => {
  subscribers.add(listener);
  return () => {
    subscribers.delete(listener);
  };
};

export const recordRound = (
  operation: Operation,
  summary: RoundSummary,
): void => {
  snapshot = applyRoundToProgress(snapshot, operation, summary);
  storage.write(snapshot);
  emit();
};

export const resetProgress = (): void => {
  snapshot = createEmptyGameProgress();
  storage.clear();
  emit();
};
