export type Operation =
  | "addition"
  | "subtraction"
  | "multiplication"
  | "division"
  | "percentage";
/** The four binary operations whose operands share the min1/max1/min2/max2 range shape. */
export type ArithmeticOperation = Exclude<Operation, "percentage">;
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
    percentage: OperationStats;
  };
}
