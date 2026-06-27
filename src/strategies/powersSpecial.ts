import type { Difficulty, Question } from "../types";
import type { Strategy } from "./types";
import { pick, randomInt } from "./util";

// "Powers 2": powers of fixed bases (2, 3, 5, 7, 11 and a few composites). Every
// result stays < 10000 *except* powers of two, which run up to 2¹⁶ = 65536.
// Difficulty climbs the exponent ladder; the composite bases arrive on hard.
interface PowerVariant {
  base: number;
  expMin: number;
  expMax: number;
}

const VARIANTS: Record<Difficulty, PowerVariant[]> = {
  easy: [
    { base: 2, expMin: 2, expMax: 9 }, // 4 … 512
    { base: 3, expMin: 2, expMax: 5 }, // 9 … 243
    { base: 5, expMin: 2, expMax: 3 }, // 25, 125
    { base: 7, expMin: 2, expMax: 3 }, // 49, 343
  ],
  medium: [
    { base: 2, expMin: 7, expMax: 12 }, // 128 … 4096
    { base: 3, expMin: 4, expMax: 7 }, // 81 … 2187
    { base: 5, expMin: 3, expMax: 5 }, // 125 … 3125
    { base: 7, expMin: 3, expMax: 4 }, // 343, 2401
    { base: 11, expMin: 2, expMax: 3 }, // 121, 1331
  ],
  hard: [
    { base: 2, expMin: 13, expMax: 16 }, // 8192 … 65536
    { base: 3, expMin: 7, expMax: 8 }, // 2187, 6561
    { base: 5, expMin: 5, expMax: 5 }, // 3125
    { base: 7, expMin: 4, expMax: 4 }, // 2401
    { base: 11, expMin: 3, expMax: 3 }, // 1331
    { base: 4, expMin: 5, expMax: 6 }, // 1024, 4096
    { base: 6, expMin: 4, expMax: 5 }, // 1296, 7776
    { base: 9, expMin: 3, expMax: 4 }, // 729, 6561
    { base: 12, expMin: 3, expMax: 3 }, // 1728
  ],
  // not offered; mirrors hard purely to keep the Record exhaustive.
  expert: [
    { base: 2, expMin: 13, expMax: 16 },
    { base: 3, expMin: 7, expMax: 8 },
    { base: 5, expMin: 5, expMax: 5 },
    { base: 7, expMin: 4, expMax: 4 },
    { base: 11, expMin: 3, expMax: 3 },
    { base: 4, expMin: 5, expMax: 6 },
    { base: 6, expMin: 4, expMax: 5 },
    { base: 9, expMin: 3, expMax: 4 },
    { base: 12, expMin: 3, expMax: 3 },
  ],
};

export const generatePowersSpecial = (difficulty: Difficulty): Question => {
  const variant = pick(VARIANTS[difficulty]);
  const exponent = randomInt(variant.expMin, variant.expMax);

  return {
    num1: variant.base,
    num2: exponent,
    operation: "power",
    correctAnswer: variant.base ** exponent,
    difficulty,
  };
};

export const powersSpecial: Strategy = {
  id: "powers-special",
  operation: "power",
  label: "Potencias de 2, 3, 5, 7, 11…",
  difficulties: ["easy", "medium", "hard"],
  describe: {
    easy: "2²–2⁹, 3²–3⁵, 5²–5³, 7²–7³",
    medium: "2⁷–2¹², 3⁴–3⁷, 5³–5⁵, 7³–7⁴, 11²–11³",
    hard: "2¹³–2¹⁶ … compuestos",
  },
  example: "2¹⁰ = 1024",
  generate: generatePowersSpecial,
};
