import type { Difficulty, Question } from "../types";
import type { Strategy } from "./types";
import { randomInt } from "./util";

const QUOTIENT_RANGE: Record<Difficulty, [number, number]> = {
  easy: [2, 25],
  medium: [26, 60],
  hard: [61, 99],
  expert: [61, 99],
};

export const generateDivideFive = (difficulty: Difficulty): Question => {
  const [min, max] = QUOTIENT_RANGE[difficulty];
  const quotient = randomInt(min, max);
  const dividend = quotient * 5;

  return {
    num1: dividend,
    num2: 5,
    operation: "division",
    correctAnswer: quotient,
    difficulty,
  };
};

export const divideFive: Strategy = {
  id: "divide-five",
  operation: "division",
  label: "Entre 5",
  difficulties: ["easy", "medium", "hard"],
  describe: {
    easy: "10-125 ÷ 5",
    medium: "130-300 ÷ 5",
    hard: "305-495 ÷ 5",
  },
  example: "240 ÷ 5 = 48 (×2, ÷10)",
  generate: generateDivideFive,
};
