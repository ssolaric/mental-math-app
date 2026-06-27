import type { Difficulty, Question } from "../types";
import type { Strategy } from "./types";
import { randomInt } from "./util";

const MULTIPLICAND_RANGE: Record<Difficulty, [number, number]> = {
  easy: [2, 25],
  medium: [10, 50],
  hard: [10, 99],
  expert: [10, 99],
};

export const generateTimesNine = (difficulty: Difficulty): Question => {
  const [min, max] = MULTIPLICAND_RANGE[difficulty];
  const multiplicand = randomInt(min, max);

  return {
    num1: multiplicand,
    num2: 9,
    operation: "multiplication",
    correctAnswer: multiplicand * 9,
    difficulty,
  };
};

export const timesNine: Strategy = {
  id: "times-nine",
  operation: "multiplication",
  label: "Por 9",
  difficulties: ["easy", "medium", "hard"],
  describe: {
    easy: "2-25 × 9",
    medium: "10-50 × 9",
    hard: "10-99 × 9",
  },
  example: "7 × 9 = 63",
  generate: generateTimesNine,
};
