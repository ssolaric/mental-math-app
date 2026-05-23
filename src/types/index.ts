export type Operation =
  | "addition"
  | "subtraction"
  | "multiplication"
  | "division";
export type Difficulty = "easy" | "medium" | "hard";

export interface Question {
  num1: number;
  num2: number;
  operation: Operation;
  correctAnswer: number;
  difficulty: Difficulty;
}

export interface OperationStats {
  totalAttempts: number;
  correctAnswers: number;
  bestScore: number;
  bestStreak: number;
  averageTime: number;
  lastPlayed: number;
}

export interface GameProgress {
  totalProblems: number;
  totalCorrect: number;
  allTimeStreak: number;
  stats: {
    addition: OperationStats;
    subtraction: OperationStats;
    multiplication: OperationStats;
    division: OperationStats;
  };
}

export const STORAGE_KEYS = {
  GAME_PROGRESS: "mental-math-progress",
  CURRENT_SESSION: "mental-math-session",
  PREFERENCES: "mental-math-preferences",
} as const;
