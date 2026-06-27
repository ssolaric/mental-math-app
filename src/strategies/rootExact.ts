import type { Difficulty, Question } from "../types";
import type { Strategy } from "./types";
import { pick, randomInt } from "./util";

// Exact square and cube roots: the radicand is always a perfect power, so the
// answer is a whole number. Built by raising the intended root, never by taking
// a root of an arbitrary number. Radicands stay < 10000 (99²=9801, 21³=9261).
interface RootVariant {
  index: number;
  rootMin: number;
  rootMax: number;
}

const VARIANTS: Record<Difficulty, RootVariant[]> = {
  easy: [{ index: 2, rootMin: 2, rootMax: 12 }], // √4 … √144
  medium: [
    { index: 2, rootMin: 2, rootMax: 30 }, // √4 … √900
    { index: 3, rootMin: 2, rootMax: 10 }, // ∛8 … ∛1000
  ],
  hard: [
    { index: 2, rootMin: 2, rootMax: 99 }, // √4 … √9801
    { index: 3, rootMin: 2, rootMax: 21 }, // ∛8 … ∛9261
  ],
  // Reached only via the operation's "Estándar" path (the strategy offers just
  // easy/medium/hard). Steps past hard's 10000 ceiling — radicands < 100000.
  expert: [
    { index: 2, rootMin: 2, rootMax: 300 }, // √4 … √90000
    { index: 3, rootMin: 2, rootMax: 46 }, // ∛8 … ∛97336
  ],
};

export const generateRootExact = (difficulty: Difficulty): Question => {
  const variant = pick(VARIANTS[difficulty]);
  const root = randomInt(variant.rootMin, variant.rootMax);

  return {
    num1: root ** variant.index, // radicand
    num2: variant.index, // root index (2 = √, 3 = ∛)
    operation: "root",
    correctAnswer: root,
    difficulty,
  };
};

export const rootExact: Strategy = {
  id: "root-exact",
  operation: "root",
  label: "Raíces exactas (√, ∛)",
  difficulties: ["easy", "medium", "hard"],
  describe: {
    easy: "√ (4–144)",
    medium: "√ (≤900), ∛ (≤1000)",
    hard: "√ (≤9801), ∛ (≤9261)",
  },
  example: "∛343 = 7",
  generate: generateRootExact,
};
