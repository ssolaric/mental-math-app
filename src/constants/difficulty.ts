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
  // Each level's operand intervals are disjoint from every lower level's and no
  // interval repeats across levels, so the four bands never share a problem:
  // 1-digit → 2-digit → 3-digit → 4-digit operands.
  addition: {
    easy: { min1: 1, max1: 9, min2: 1, max2: 9 },
    medium: { min1: 10, max1: 99, min2: 10, max2: 99 },
    hard: { min1: 100, max1: 999, min2: 100, max2: 999 },
    expert: { min1: 1000, max1: 9999, min2: 1000, max2: 9999 },
  },
  subtraction: {
    easy: { min1: 11, max1: 18, min2: 2, max2: 9 },
    medium: { min1: 20, max1: 99, min2: 11, max2: 89 },
    hard: { min1: 100, max1: 999, min2: 100, max2: 999 },
    expert: { min1: 1000, max1: 9999, min2: 1000, max2: 9999 },
  },
  // Multiplication grows by the larger operand: 1×1-digit, 1×2-digit, then two
  // disjoint 2-digit bands (11-30, 31-99) so hard and expert never overlap.
  multiplication: {
    easy: { min1: 1, max1: 9, min2: 1, max2: 9 },
    medium: { min1: 2, max1: 9, min2: 10, max2: 99 },
    hard: { min1: 11, max1: 30, min2: 11, max2: 30 },
    expert: { min1: 31, max1: 99, min2: 31, max2: 99 },
  },
  // Division: min1/max1 is the divisor, min2/max2 the dividend. The dividend grows
  // 2-digit → 3-digit → 4-digit, so hard and expert dividends no longer overlap.
  division: {
    easy: { min1: 1, max1: 9, min2: 1, max2: 9 },
    medium: { min1: 2, max1: 9, min2: 20, max2: 99 },
    hard: { min1: 2, max1: 9, min2: 100, max2: 999 },
    expert: { min1: 11, max1: 25, min2: 1000, max2: 9999 },
  },
};
