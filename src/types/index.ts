import type { Locale } from "../i18n/types";

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

export interface SessionData {
  operation: Operation;
  difficulty: Difficulty;
  questionsAnswered: number;
  correctAnswers: number;
  currentStreak: number;
  bestStreak: number;
  score: number;
  startTime: number;
  lastQuestionTime: number;
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

export interface Preferences {
  language: Locale;
  soundEnabled?: boolean;
  showTimer?: boolean;
  defaultDifficulty?: Difficulty;
}

export const STORAGE_KEYS = {
  GAME_PROGRESS: "mental-math-progress",
  CURRENT_SESSION: "mental-math-session",
  PREFERENCES: "mental-math-preferences",
} as const;

export type Screen =
  | "landing"
  | "operation-select"
  | "difficulty-select"
  | "game"
  | "summary"
  | "stats";

export interface GameState {
  screen: Screen;
  selectedOperation: Operation | null;
  selectedDifficulty: Difficulty | null;
  currentQuestion: Question | null;
  sessionData: SessionData | null;
}
