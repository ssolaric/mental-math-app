import type { Difficulty, Question } from "../types";
import type { Strategy } from "./types";
import { randomInt } from "./util";

// ÷25 is the inverse of ×25: divide by 100, then multiply by 4. Pick the quotient
// so the dividend is always a clean multiple of 25.
const QUOTIENT_RANGE: Record<Difficulty, [number, number]> = {
  easy: [2, 9],
  medium: [10, 20],
  hard: [10, 40],
  expert: [10, 40],
};

export const generateDivideTwentyFive = (difficulty: Difficulty): Question => {
  const [min, max] = QUOTIENT_RANGE[difficulty];
  const quotient = randomInt(min, max);
  const dividend = quotient * 25;

  return {
    num1: dividend,
    num2: 25,
    operation: "division",
    correctAnswer: quotient,
    difficulty,
  };
};

export const divideTwentyFive: Strategy = {
  id: "divide-twentyfive",
  operation: "division",
  label: "Entre 25",
  difficulties: ["easy", "medium", "hard"],
  describe: {
    easy: "50-225 ÷ 25",
    medium: "250-500 ÷ 25",
    hard: "250-1000 ÷ 25",
  },
  example: "300 ÷ 25 = 12 (÷100, ×4)",
  generate: generateDivideTwentyFive,
};
