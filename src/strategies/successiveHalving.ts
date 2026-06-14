import type { Difficulty, Question } from "../types";
import type { Strategy } from "./types";
import { randomInt } from "./util";

// divisors reached by repeated halving; quotient stays a whole number
const CONFIG: Record<
  Difficulty,
  { divisor: number; quotient: [number, number] }
> = {
  easy: { divisor: 4, quotient: [2, 12] },
  medium: { divisor: 8, quotient: [2, 12] },
  hard: { divisor: 8, quotient: [13, 40] },
  expert: { divisor: 8, quotient: [13, 40] },
};

export const generateSuccessiveHalving = (difficulty: Difficulty): Question => {
  const { divisor, quotient } = CONFIG[difficulty];
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

export const successiveHalving: Strategy = {
  id: "successive-halving",
  operation: "division",
  label: "Mitades sucesivas",
  difficulties: ["easy", "medium", "hard"],
  describe: {
    easy: "÷4 (doble mitad)",
    medium: "÷8 (triple mitad)",
    hard: "÷8 con dividendos grandes",
  },
  generate: generateSuccessiveHalving,
};
