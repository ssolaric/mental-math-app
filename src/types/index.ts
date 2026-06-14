export type Operation =
  | "addition"
  | "subtraction"
  | "multiplication"
  | "division";
export type Difficulty = "easy" | "medium" | "hard" | "expert";

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
