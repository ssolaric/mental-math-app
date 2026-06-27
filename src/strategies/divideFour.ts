import type { Difficulty, Question } from "../types";
import type { Strategy } from "./types";
import { randomInt } from "./util";

// ÷4 is two halvings in a row — pick the quotient so the dividend is a multiple of 4
const QUOTIENT_RANGE: Record<Difficulty, [number, number]> = {
  easy: [2, 30],
  medium: [31, 80],
  hard: [81, 150],
  expert: [81, 150],
};

export const generateDivideFour = (difficulty: Difficulty): Question => {
  const [min, max] = QUOTIENT_RANGE[difficulty];
  const quotient = randomInt(min, max);
  const dividend = quotient * 4;

  return {
    num1: dividend,
    num2: 4,
    operation: "division",
    correctAnswer: quotient,
    difficulty,
  };
};

export const divideFour: Strategy = {
  id: "divide-four",
  operation: "division",
  label: "Entre 4 (mitad mitad)",
  difficulties: ["easy", "medium", "hard"],
  describe: {
    easy: "8-120 ÷ 4",
    medium: "124-320 ÷ 4",
    hard: "324-600 ÷ 4",
  },
  example: "92 ÷ 4 = 23 (mitad, mitad)",
  generate: generateDivideFour,
};
