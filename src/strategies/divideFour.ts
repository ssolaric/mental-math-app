import type { Difficulty, Question } from "../types";
import type { Strategy } from "./types";
import { randomInt } from "./util";

// ÷4 is two halvings in a row — pick the quotient so the dividend is a multiple of 4
const QUOTIENT_RANGE: Record<Difficulty, [number, number]> = {
  easy: [2, 12],
  medium: [13, 40],
  hard: [41, 150],
  expert: [41, 150],
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
    easy: "8-48 ÷ 4",
    medium: "52-160 ÷ 4",
    hard: "164-600 ÷ 4",
  },
  example: "92 ÷ 4 = 23 (mitad, mitad)",
  generate: generateDivideFour,
};
