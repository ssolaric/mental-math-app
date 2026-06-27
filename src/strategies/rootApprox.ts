import type { Difficulty, Question } from "../types";
import type { Strategy } from "./types";
import { floorRoot, isPerfectPower, pick, randomInt } from "./util";

// Approximate roots: estimate the square/cube root and round *down* to the
// integer floor. The radicand is deliberately never a perfect power, so the
// answer is a genuine estimate rather than an exact root. Radicands < 10000.
interface RootVariant {
  index: number;
  min: number;
  max: number;
}

const VARIANTS: Record<Difficulty, RootVariant[]> = {
  easy: [{ index: 2, min: 5, max: 143 }], // ⌊√⌋ = 2 … 11
  medium: [
    { index: 2, min: 50, max: 999 }, // ⌊√⌋ = 7 … 31
    { index: 3, min: 30, max: 499 }, // ⌊∛⌋ = 3 … 7
  ],
  hard: [
    { index: 2, min: 1000, max: 9999 }, // ⌊√⌋ = 31 … 99
    { index: 3, min: 500, max: 9999 }, // ⌊∛⌋ = 7 … 21
  ],
  // not offered; mirrors hard to keep the Record exhaustive.
  expert: [
    { index: 2, min: 1000, max: 9999 },
    { index: 3, min: 500, max: 9999 },
  ],
};

export const generateRootApprox = (difficulty: Difficulty): Question => {
  const variant = pick(VARIANTS[difficulty]);

  let radicand = randomInt(variant.min, variant.max);
  // Re-roll perfect powers so the floor is a true rounding-down, not an exact root.
  while (isPerfectPower(radicand, variant.index)) {
    radicand = randomInt(variant.min, variant.max);
  }

  return {
    num1: radicand,
    num2: variant.index, // root index (2 = √, 3 = ∛)
    operation: "root",
    correctAnswer: floorRoot(radicand, variant.index),
    difficulty,
  };
};

export const rootApprox: Strategy = {
  id: "root-approx",
  operation: "root",
  label: "Raíces aproximadas (parte entera)",
  difficulties: ["easy", "medium", "hard"],
  describe: {
    easy: "⌊√⌋ (5–143)",
    medium: "⌊√⌋, ⌊∛⌋ (≤999)",
    hard: "⌊√⌋, ⌊∛⌋ (≤9999)",
  },
  example: "⌊√70⌋ = 8",
  generate: generateRootApprox,
};
