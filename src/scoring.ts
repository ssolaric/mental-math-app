import type { Difficulty } from "./types";

const BASE_POINTS: Record<Difficulty, number> = {
  easy: 10,
  medium: 20,
  hard: 30,
  expert: 40,
};

const streakMultiplier = (streak: number): number => {
  if (streak >= 10) return 2.0;
  if (streak >= 5) return 1.5;
  if (streak >= 3) return 1.2;
  return 1.0;
};

const speedBonus = (timeInSeconds: number): number => {
  if (timeInSeconds < 3) return 5;
  if (timeInSeconds < 5) return 2;
  return 0;
};

export const score = (
  difficulty: Difficulty,
  streak: number,
  timeInSeconds: number,
): number =>
  Math.floor(BASE_POINTS[difficulty] * streakMultiplier(streak)) +
  speedBonus(timeInSeconds);
