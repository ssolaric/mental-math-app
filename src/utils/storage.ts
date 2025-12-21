import type { GameProgress, Operation, OperationStats } from "../types";

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

export const updateGameProgress = (
  progress: GameProgress,
  operation: Operation,
  correctAnswers: number,
  totalQuestions: number,
  score: number,
  bestStreak: number,
  averageTimeMs: number,
): GameProgress => {
  const operationStats = progress.stats[operation];

  return {
    ...progress,
    totalProblems: progress.totalProblems + totalQuestions,
    totalCorrect: progress.totalCorrect + correctAnswers,
    allTimeStreak: Math.max(progress.allTimeStreak, bestStreak),
    stats: {
      ...progress.stats,
      [operation]: {
        totalAttempts: operationStats.totalAttempts + totalQuestions,
        correctAnswers: operationStats.correctAnswers + correctAnswers,
        bestScore: Math.max(operationStats.bestScore, score),
        bestStreak: Math.max(operationStats.bestStreak, bestStreak),
        averageTime:
          operationStats.totalAttempts === 0
            ? averageTimeMs
            : (operationStats.averageTime * operationStats.totalAttempts +
                averageTimeMs * totalQuestions) /
              (operationStats.totalAttempts + totalQuestions),
        lastPlayed: Date.now(),
      },
    },
  };
};
