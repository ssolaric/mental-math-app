import type { Difficulty, Operation } from "../types";

export interface DifficultyRange {
  min1: number;
  max1: number;
  min2: number;
  max2: number;
}

export const DIFFICULTY_RANGES: Record<
  Operation,
  Record<Difficulty, DifficultyRange>
> = {
  addition: {
    easy: { min1: 1, max1: 9, min2: 1, max2: 9 },
    medium: { min1: 10, max1: 99, min2: 10, max2: 99 },
    hard: { min1: 100, max1: 999, min2: 10, max2: 99 },
    expert: { min1: 100, max1: 999, min2: 100, max2: 999 },
  },
  subtraction: {
    easy: { min1: 11, max1: 18, min2: 2, max2: 9 },
    medium: { min1: 20, max1: 99, min2: 11, max2: 89 },
    hard: { min1: 100, max1: 999, min2: 10, max2: 99 },
    expert: { min1: 100, max1: 999, min2: 100, max2: 999 },
  },
  multiplication: {
    easy: { min1: 1, max1: 9, min2: 1, max2: 9 },
    medium: { min1: 2, max1: 9, min2: 10, max2: 99 },
    hard: { min1: 11, max1: 30, min2: 11, max2: 30 },
    expert: { min1: 11, max1: 99, min2: 11, max2: 99 },
  },
  division: {
    easy: { min1: 1, max1: 9, min2: 1, max2: 9 },
    medium: { min1: 2, max1: 9, min2: 20, max2: 99 },
    hard: { min1: 2, max1: 9, min2: 100, max2: 999 },
    expert: { min1: 11, max1: 25, min2: 100, max2: 999 },
  },
};
