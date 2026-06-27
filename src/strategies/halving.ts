import type { Difficulty, Question } from "../types";
import type { Strategy } from "./types";
import { randomInt } from "./util";

// pick the quotient (the answer); dividend = quotient × 2, always even
const QUOTIENT_RANGE: Record<Difficulty, [number, number]> = {
  easy: [2, 30],
  medium: [31, 75],
  hard: [76, 250],
  expert: [76, 250],
};

export const generateHalving = (difficulty: Difficulty): Question => {
  const [min, max] = QUOTIENT_RANGE[difficulty];
  const quotient = randomInt(min, max);
  const dividend = quotient * 2;

  return {
    num1: dividend,
    num2: 2,
    operation: "division",
    correctAnswer: quotient,
    difficulty,
  };
};

export const halving: Strategy = {
  id: "halving",
  operation: "division",
  label: "Mitad",
  difficulties: ["easy", "medium", "hard"],
  describe: {
    easy: "4-60 ÷ 2",
    medium: "62-150 ÷ 2",
    hard: "152-500 ÷ 2",
  },
  example: "86 ÷ 2 = 43",
  generate: generateHalving,
};
