import type { Difficulty, Question } from "../types";
import type { Strategy } from "./types";
import { randomInt } from "./util";

const MULTIPLICAND_RANGE: Record<Difficulty, [number, number]> = {
  easy: [2, 20],
  medium: [20, 99],
  hard: [100, 999],
  expert: [100, 999],
};

export const generateTimesFive = (difficulty: Difficulty): Question => {
  const [min, max] = MULTIPLICAND_RANGE[difficulty];
  const multiplicand = randomInt(min, max);

  return {
    num1: multiplicand,
    num2: 5,
    operation: "multiplication",
    correctAnswer: multiplicand * 5,
    difficulty,
  };
};

export const timesFive: Strategy = {
  id: "times-five",
  operation: "multiplication",
  label: "Por 5",
  difficulties: ["easy", "medium", "hard"],
  describe: {
    easy: "2-20 × 5",
    medium: "20-99 × 5",
    hard: "100-999 × 5",
  },
  example: "48 × 5 = 240",
  generate: generateTimesFive,
};
