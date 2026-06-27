import type { Difficulty, Question } from "../types";
import type { Strategy } from "./types";
import { pick, randomInt } from "./util";

// composite divisors a student splits into easier factors (÷6 = ÷2 then ÷3)
const CONFIG: Record<
  Difficulty,
  { divisors: number[]; quotient: [number, number] }
> = {
  easy: { divisors: [6], quotient: [2, 25] },
  medium: { divisors: [12, 15], quotient: [2, 12] },
  hard: { divisors: [24, 36], quotient: [2, 12] },
  expert: { divisors: [24, 36], quotient: [2, 12] },
};

export const generateDivideFactors = (difficulty: Difficulty): Question => {
  const { divisors, quotient } = CONFIG[difficulty];
  const divisor = pick(divisors);
  const q = randomInt(quotient[0], quotient[1]);
  const dividend = q * divisor;

  return {
    num1: dividend,
    num2: divisor,
    operation: "division",
    correctAnswer: q,
    difficulty,
  };
};

export const divideFactors: Strategy = {
  id: "divide-factors",
  operation: "division",
  label: "Por factores",
  difficulties: ["easy", "medium", "hard"],
  describe: {
    easy: "÷6 (÷2 y ÷3)",
    medium: "÷12, ÷15",
    hard: "÷24, ÷36",
  },
  example: "144 ÷ 12 = 12 (÷4, ÷3)",
  generate: generateDivideFactors,
};
