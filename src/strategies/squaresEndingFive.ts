import type { Difficulty, Question } from "../types";
import type { Strategy } from "./types";
import { randomInt } from "./util";

// numbers ending in 5 whose square is found by n(n+1) prepended to "25"
// Only nine two-digit numbers end in 5 (15…95), so the tiers reach into
// three-digit bases to keep each pool comfortably larger than a round. The
// technique — n(n+1) with "25" appended — is identical at every magnitude.
const TENS_RANGE: Record<Difficulty, [number, number]> = {
  easy: [1, 20], // 15² .. 205²
  medium: [21, 55], // 215² .. 555²
  hard: [56, 99], // 565² .. 995²
  expert: [56, 99],
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
    easy: "15² … 205²",
    medium: "215² … 555²",
    hard: "565² … 995²",
  },
  example: "35² = 1225",
  generate: generateSquaresEndingFive,
};
