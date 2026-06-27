import type { Difficulty, Question } from "../types";
import type { Strategy } from "./types";
import { randomInt } from "./util";

// ×99 = ×100 − ×1, so the trick is subtracting the number from its hundredfold
const MULTIPLICAND_RANGE: Record<Difficulty, [number, number]> = {
  easy: [2, 25],
  medium: [10, 50],
  hard: [10, 99],
  expert: [10, 99],
};

export const generateTimesNineNine = (difficulty: Difficulty): Question => {
  const [min, max] = MULTIPLICAND_RANGE[difficulty];
  const multiplicand = randomInt(min, max);

  return {
    num1: multiplicand,
    num2: 99,
    operation: "multiplication",
    correctAnswer: multiplicand * 99,
    difficulty,
  };
};

export const timesNineNine: Strategy = {
  id: "times-ninetynine",
  operation: "multiplication",
  label: "Por 99",
  difficulties: ["easy", "medium", "hard"],
  describe: {
    easy: "2-25 × 99",
    medium: "10-50 × 99",
    hard: "10-99 × 99",
  },
  example: "7 × 99 = 693 (700 − 7)",
  generate: generateTimesNineNine,
};
