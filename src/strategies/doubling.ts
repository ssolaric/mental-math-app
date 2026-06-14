import type { Difficulty, Question } from "../types";
import type { Strategy } from "./types";
import { randomInt } from "./util";

const NUMBER_RANGE: Record<Difficulty, [number, number]> = {
  easy: [2, 20],
  medium: [21, 99],
  hard: [100, 500],
  expert: [100, 500],
};

export const generateDoubling = (difficulty: Difficulty): Question => {
  const [min, max] = NUMBER_RANGE[difficulty];
  const number = randomInt(min, max);

  return {
    num1: number,
    num2: 2,
    operation: "multiplication",
    correctAnswer: number * 2,
    difficulty,
  };
};

export const doubling: Strategy = {
  id: "doubling",
  operation: "multiplication",
  label: "Doblar",
  difficulties: ["easy", "medium", "hard"],
  describe: {
    easy: "2-20 × 2",
    medium: "21-99 × 2",
    hard: "100-500 × 2",
  },
  example: "34 × 2 = 68",
  generate: generateDoubling,
};
