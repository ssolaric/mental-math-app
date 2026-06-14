import type { Difficulty, Question } from "../types";
import type { Strategy } from "./types";
import { randomInt } from "./util";

// both factors sit close to a power-of-ten base, so the difference method applies
const CONFIG: Record<Difficulty, { base: number; spread: number }> = {
  easy: { base: 100, spread: 4 }, // 96 … 104
  medium: { base: 100, spread: 9 }, // 91 … 109
  hard: { base: 1000, spread: 9 }, // 991 … 1009
  expert: { base: 1000, spread: 9 },
};

const nearBy = (base: number, spread: number): number => {
  let offset = 0;
  while (offset === 0) {
    offset = randomInt(-spread, spread);
  }
  return base + offset;
};

export const generateNearBase = (difficulty: Difficulty): Question => {
  const { base, spread } = CONFIG[difficulty];
  const num1 = nearBy(base, spread);
  const num2 = nearBy(base, spread);

  return {
    num1,
    num2,
    operation: "multiplication",
    correctAnswer: num1 * num2,
    difficulty,
  };
};

export const nearBase: Strategy = {
  id: "near-base",
  operation: "multiplication",
  label: "Casi base (98×97)",
  difficulties: ["easy", "medium", "hard"],
  describe: {
    easy: "factores 96-104",
    medium: "factores 91-109",
    hard: "factores 991-1009",
  },
  generate: generateNearBase,
};
