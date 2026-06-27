import type { Difficulty, Question } from "../types";
import type { Strategy } from "./types";
import { randomInt } from "./util";

// ×8 is three doublings in a row — double, double, double
const NUMBER_RANGE: Record<Difficulty, [number, number]> = {
  easy: [2, 30],
  medium: [31, 60],
  hard: [61, 99],
  expert: [61, 99],
};

export const generateTimesEight = (difficulty: Difficulty): Question => {
  const [min, max] = NUMBER_RANGE[difficulty];
  const number = randomInt(min, max);

  return {
    num1: number,
    num2: 8,
    operation: "multiplication",
    correctAnswer: number * 8,
    difficulty,
  };
};

export const timesEight: Strategy = {
  id: "times-eight",
  operation: "multiplication",
  label: "Por 8 (triple doble)",
  difficulties: ["easy", "medium", "hard"],
  describe: {
    easy: "2-30 × 8",
    medium: "31-60 × 8",
    hard: "61-99 × 8",
  },
  example: "23 × 8 = 184 (doble ×3)",
  generate: generateTimesEight,
};
