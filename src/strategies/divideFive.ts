import type { Difficulty, Question } from "../types";
import type { Strategy } from "./types";
import { randomInt } from "./util";

const QUOTIENT_RANGE: Record<Difficulty, [number, number]> = {
  easy: [2, 9],
  medium: [10, 40],
  hard: [41, 99],
  expert: [41, 99],
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
    easy: "10-45 ÷ 5",
    medium: "50-200 ÷ 5",
    hard: "205-495 ÷ 5",
  },
  generate: generateDivideFive,
};
