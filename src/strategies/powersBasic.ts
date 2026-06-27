import type { Difficulty, Question } from "../types";
import type { Strategy } from "./types";
import { pick, randomInt } from "./util";

// "Powers 1": perfect squares, cubes, 4th and 5th powers, every result < 10000.
// Each variant fixes the exponent and the base range that keeps the result
// under the cap; difficulty widens both the bases and the exponents on offer.
interface PowerVariant {
  exponent: number;
  baseMin: number;
  baseMax: number;
}

// baseMax per exponent at the 10000 ceiling: 99²=9801, 21³=9261, 9⁴=6561, 6⁵=7776.
const VARIANTS: Record<Difficulty, PowerVariant[]> = {
  easy: [
    { exponent: 2, baseMin: 2, baseMax: 15 },
    { exponent: 3, baseMin: 2, baseMax: 6 },
  ],
  medium: [
    { exponent: 2, baseMin: 2, baseMax: 30 },
    { exponent: 3, baseMin: 2, baseMax: 12 },
    { exponent: 4, baseMin: 2, baseMax: 6 },
    { exponent: 5, baseMin: 2, baseMax: 4 },
  ],
  hard: [
    { exponent: 2, baseMin: 2, baseMax: 99 },
    { exponent: 3, baseMin: 2, baseMax: 21 },
    { exponent: 4, baseMin: 2, baseMax: 9 },
    { exponent: 5, baseMin: 2, baseMax: 6 },
  ],
  // Reached only via the operation's "Estándar" path (the strategy offers just
  // easy/medium/hard). Steps past hard's 10000 ceiling — every result < 100000.
  expert: [
    { exponent: 2, baseMin: 2, baseMax: 300 }, // 300² = 90000
    { exponent: 3, baseMin: 2, baseMax: 46 }, // 46³ = 97336
    { exponent: 4, baseMin: 2, baseMax: 17 }, // 17⁴ = 83521
    { exponent: 5, baseMin: 2, baseMax: 9 }, // 9⁵ = 59049
  ],
};

export const generatePowersBasic = (difficulty: Difficulty): Question => {
  const variant = pick(VARIANTS[difficulty]);
  const base = randomInt(variant.baseMin, variant.baseMax);

  return {
    num1: base,
    num2: variant.exponent,
    operation: "power",
    correctAnswer: base ** variant.exponent,
    difficulty,
  };
};

export const powersBasic: Strategy = {
  id: "powers-basic",
  operation: "power",
  label: "Potencias (cuadrados a quintas)",
  difficulties: ["easy", "medium", "hard"],
  describe: {
    easy: "n² (≤15), n³ (≤6)",
    medium: "n² (≤30) … n⁵ (≤4)",
    hard: "n² (≤99) … n⁵ (≤6)",
  },
  example: "7³ = 343",
  generate: generatePowersBasic,
};
