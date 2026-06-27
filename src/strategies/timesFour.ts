import type { Difficulty, Question } from "../types";
import type { Strategy } from "./types";
import { randomInt } from "./util";

// ×4 is two doublings in a row — double, then double again
const NUMBER_RANGE: Record<Difficulty, [number, number]> = {
  easy: [2, 12],
  medium: [13, 50],
  hard: [51, 99],
  expert: [51, 99],
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
    easy: "2-12 × 4",
    medium: "13-50 × 4",
    hard: "51-99 × 4",
  },
  example: "24 × 4 = 96 (doble, doble)",
  generate: generateTimesFour,
};
