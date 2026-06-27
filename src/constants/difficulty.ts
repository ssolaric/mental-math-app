import type { ArithmeticOperation, Difficulty } from "../types";

export interface DifficultyRange {
  min1: number;
  max1: number;
  min2: number;
  max2: number;
}

// Percentage problems don't have a symmetric two-operand range, so they carry
// their own config in mathGenerator.ts rather than appearing here.
export const DIFFICULTY_RANGES: Record<
  ArithmeticOperation,
  Record<Difficulty, DifficultyRange>
> = {
  // Each level pins ONE operand (the "driver") to a digit band disjoint from every
  // lower level, which alone makes the two problem sets disjoint — the companion
  // operand may reuse a lower band purely for variety. This keeps the top tiers
  // genuinely harder without the brutal "4-digit + 4-digit" both-operands grind.
  //
  // Addition driver = num1, climbing 1→2→3→4 digits; the 4-digit expert companion
  // ranges over 1-4 digits so problems stay varied, not uniformly enormous.
  addition: {
    easy: { min1: 1, max1: 9, min2: 1, max2: 9 },
    medium: { min1: 10, max1: 99, min2: 10, max2: 99 },
    hard: { min1: 100, max1: 999, min2: 100, max2: 999 },
    expert: { min1: 1000, max1: 9999, min2: 1, max2: 9999 },
  },
  // Subtraction driver = the minuend (num1's floor sets the digit band); the
  // subtrahend (num2) is floored at two digits from medium up so a problem never
  // collapses into a trivial "n − 3".
  subtraction: {
    easy: { min1: 11, max1: 18, min2: 2, max2: 9 },
    medium: { min1: 20, max1: 99, min2: 11, max2: 89 },
    hard: { min1: 100, max1: 999, min2: 10, max2: 99 },
    expert: { min1: 1000, max1: 9999, min2: 10, max2: 9999 },
  },
  // Multiplication driver = the larger factor: 1×1-digit, 1×2-digit, the small
  // 2-digit band (11-30), then a factor above 30. Expert's companion stays any
  // 2-digit number, so 31-99 alone keeps hard and expert from sharing a pair.
  multiplication: {
    easy: { min1: 1, max1: 9, min2: 1, max2: 9 },
    medium: { min1: 2, max1: 9, min2: 10, max2: 99 },
    hard: { min1: 11, max1: 30, min2: 11, max2: 30 },
    expert: { min1: 31, max1: 99, min2: 11, max2: 99 },
  },
  // Division: min1/max1 is the divisor, min2/max2 the dividend. Hard steps the
  // dividend to 3 digits; expert keeps that 3-digit dividend but steps the divisor
  // to two digits — the divisor (driver) alone makes expert disjoint from hard.
  division: {
    easy: { min1: 1, max1: 9, min2: 1, max2: 9 },
    medium: { min1: 2, max1: 9, min2: 20, max2: 99 },
    hard: { min1: 2, max1: 9, min2: 100, max2: 999 },
    expert: { min1: 11, max1: 25, min2: 100, max2: 999 },
  },
};
