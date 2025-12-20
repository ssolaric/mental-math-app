import type { Difficulty, Operation } from '../types';

export interface DifficultyRange {
  min1: number;
  max1: number;
  min2: number;
  max2: number;
}

export const DIFFICULTY_RANGES: Record<Operation, Record<Difficulty, DifficultyRange>> = {
  addition: {
    easy: { min1: 1, max1: 9, min2: 1, max2: 9 },
    medium: { min1: 10, max1: 99, min2: 10, max2: 99 },
    hard: { min1: 100, max1: 999, min2: 10, max2: 99 },
  },
  subtraction: {
    easy: { min1: 5, max1: 9, min2: 1, max2: 5 },
    medium: { min1: 20, max1: 99, min2: 1, max2: 50 },
    hard: { min1: 100, max1: 999, min2: 10, max2: 99 },
  },
  multiplication: {
    easy: { min1: 1, max1: 9, min2: 1, max2: 9 },
    medium: { min1: 1, max1: 9, min2: 10, max2: 20 },
    hard: { min1: 10, max1: 25, min2: 2, max2: 9 },
  },
  division: {
    easy: { min1: 1, max1: 9, min2: 1, max2: 9 },
    medium: { min1: 2, max1: 9, min2: 20, max2: 90 },
    hard: { min1: 2, max1: 9, min2: 10, max2: 99 },
  },
};

export const BASE_POINTS: Record<Difficulty, number> = {
  easy: 10,
  medium: 20,
  hard: 30,
};

export const getStreakMultiplier = (streak: number): number => {
  if (streak >= 10) return 2.0;
  if (streak >= 5) return 1.5;
  if (streak >= 3) return 1.2;
  return 1.0;
};

export const getSpeedBonus = (timeInSeconds: number): number => {
  if (timeInSeconds < 3) return 5;
  if (timeInSeconds < 5) return 2;
  return 0;
};

export const calculatePoints = (
  difficulty: Difficulty,
  streak: number,
  timeInSeconds: number
): number => {
  const base = BASE_POINTS[difficulty];
  const multiplier = getStreakMultiplier(streak);
  const bonus = getSpeedBonus(timeInSeconds);
  return Math.floor(base * multiplier) + bonus;
};

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

export const OPERATION_LABELS: Record<Operation, string> = {
  addition: 'Addition',
  subtraction: 'Subtraction',
  multiplication: 'Multiplication',
  division: 'Division',
};

export const OPERATION_SYMBOLS: Record<Operation, string> = {
  addition: '+',
  subtraction: '−',
  multiplication: '×',
  division: '÷',
};

export const DIFFICULTY_DESCRIPTIONS: Record<Operation, Record<Difficulty, string>> = {
  addition: {
    easy: '1-9 + 1-9',
    medium: '10-99 + 10-99',
    hard: '100-999 + 10-99',
  },
  subtraction: {
    easy: '5-9 − 1-5',
    medium: '20-99 − 1-50',
    hard: '100-999 − 10-99',
  },
  multiplication: {
    easy: '1-9 × 1-9',
    medium: '1-9 × 10-20',
    hard: '10-25 × 2-9',
  },
  division: {
    easy: 'Basic facts',
    medium: '20-90 ÷ 2-9',
    hard: '10-99 ÷ 2-9',
  },
};
