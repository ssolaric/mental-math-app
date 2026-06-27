import type { Difficulty, Question } from "../types";
import type { Strategy } from "./types";
import { randomInt } from "./util";

const MULTIPLICAND_RANGE: Record<Difficulty, [number, number]> = {
  easy: [2, 25],
  medium: [10, 40],
  hard: [10, 99],
  expert: [10, 99],
};

export const generateTimesTwentyFive = (difficulty: Difficulty): Question => {
  const [min, max] = MULTIPLICAND_RANGE[difficulty];
  const multiplicand = randomInt(min, max);

  return {
    num1: multiplicand,
    num2: 25,
    operation: "multiplication",
    correctAnswer: multiplicand * 25,
    difficulty,
  };
};

export const timesTwentyFive: Strategy = {
  id: "times-twentyfive",
  operation: "multiplication",
  label: "Por 25",
  difficulties: ["easy", "medium", "hard"],
  describe: {
    easy: "2-25 × 25",
    medium: "10-40 × 25",
    hard: "10-99 × 25",
  },
  example: "36 × 25 = 900",
  generate: generateTimesTwentyFive,
};
