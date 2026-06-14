import type { Difficulty, Question } from "../types";
import type { Strategy } from "./types";
import { randomInt } from "./util";

// operands straddle a round number with a small gap, so you count up across it
const CONFIG: Record<
  Difficulty,
  { unit: number; pivots: [number, number]; below: number; above: number }
> = {
  easy: { unit: 10, pivots: [2, 9], below: 5, above: 5 },
  medium: { unit: 10, pivots: [3, 20], below: 8, above: 8 },
  hard: { unit: 100, pivots: [2, 9], below: 40, above: 40 },
  expert: { unit: 100, pivots: [2, 9], below: 40, above: 40 },
};

export const generateSubCountUp = (difficulty: Difficulty): Question => {
  const { unit, pivots, below, above } = CONFIG[difficulty];
  const pivot = randomInt(pivots[0], pivots[1]) * unit;
  const num2 = pivot - randomInt(1, below); // just below the round number
  const num1 = pivot + randomInt(0, above); // on or just above it

  return {
    num1,
    num2,
    operation: "subtraction",
    correctAnswer: num1 - num2,
    difficulty,
  };
};

export const subCountUp: Strategy = {
  id: "sub-count-up",
  operation: "subtraction",
  label: "Contar hacia arriba",
  difficulties: ["easy", "medium", "hard"],
  describe: {
    easy: "cruzar una decena",
    medium: "cruzar una decena",
    hard: "cruzar una centena",
  },
  example: "61 − 58 = 3 (cuenta arriba)",
  generate: generateSubCountUp,
};
