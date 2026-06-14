import type { Difficulty, Question } from "../types";
import type { Strategy } from "./types";
import { randomInt } from "./util";

// numbers ending in 5 whose square is found by n(n+1) prepended to "25"
const TENS_RANGE: Record<Difficulty, [number, number]> = {
  easy: [1, 4], // 15, 25, 35, 45
  medium: [1, 9], // 15 .. 95
  hard: [10, 19], // 105 .. 195
  expert: [10, 19],
};

export const generateSquaresEndingFive = (difficulty: Difficulty): Question => {
  const [min, max] = TENS_RANGE[difficulty];
  const base = randomInt(min, max) * 10 + 5;

  return {
    num1: base,
    num2: base,
    operation: "multiplication",
    correctAnswer: base * base,
    difficulty,
  };
};

export const squaresEndingFive: Strategy = {
  id: "squares-ending-five",
  operation: "multiplication",
  label: "Cuadrados (termina en 5)",
  difficulties: ["easy", "medium", "hard"],
  describe: {
    easy: "15² … 45²",
    medium: "15² … 95²",
    hard: "105² … 195²",
  },
  example: "35² = 1225",
  generate: generateSquaresEndingFive,
};
