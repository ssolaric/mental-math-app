import type { Difficulty, Question } from "../types";
import type { Strategy } from "./types";
import { randomInt } from "./util";

// ×4 is two doublings in a row — double, then double again
const NUMBER_RANGE: Record<Difficulty, [number, number]> = {
  easy: [2, 30],
  medium: [31, 60],
  hard: [61, 99],
  expert: [61, 99],
};

export const generateTimesFour = (difficulty: Difficulty): Question => {
  const [min, max] = NUMBER_RANGE[difficulty];
  const number = randomInt(min, max);

  return {
    num1: number,
    num2: 4,
    operation: "multiplication",
    correctAnswer: number * 4,
    difficulty,
  };
};

export const timesFour: Strategy = {
  id: "times-four",
  operation: "multiplication",
  label: "Por 4 (doble doble)",
  difficulties: ["easy", "medium", "hard"],
  describe: {
    easy: "2-30 × 4",
    medium: "31-60 × 4",
    hard: "61-99 × 4",
  },
  example: "24 × 4 = 96 (doble, doble)",
  generate: generateTimesFour,
};
