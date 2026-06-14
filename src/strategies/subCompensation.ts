import type { Difficulty, Question } from "../types";
import type { Strategy } from "./types";
import { nearRound, randomInt } from "./util";

// the subtrahend sits near a round number, so you round it then add back the diff
const CONFIG: Record<
  Difficulty,
  {
    unit: number;
    rounds: [number, number];
    delta: number;
    spread: [number, number];
  }
> = {
  easy: { unit: 10, rounds: [2, 8], delta: 2, spread: [5, 40] },
  medium: { unit: 10, rounds: [2, 9], delta: 3, spread: [10, 90] },
  hard: { unit: 100, rounds: [1, 8], delta: 3, spread: [20, 200] },
  expert: { unit: 100, rounds: [1, 8], delta: 3, spread: [20, 200] },
};

export const generateSubCompensation = (difficulty: Difficulty): Question => {
  const { unit, rounds, delta, spread } = CONFIG[difficulty];
  const subtrahend = nearRound(unit, rounds, delta);
  const minuend = subtrahend + randomInt(spread[0], spread[1]);

  return {
    num1: minuend,
    num2: subtrahend,
    operation: "subtraction",
    correctAnswer: minuend - subtrahend,
    difficulty,
  };
};

export const subCompensation: Strategy = {
  id: "sub-compensation",
  operation: "subtraction",
  label: "Compensación",
  difficulties: ["easy", "medium", "hard"],
  describe: {
    easy: "restar casi-decena",
    medium: "restar casi-decena",
    hard: "restar casi-centena",
  },
  generate: generateSubCompensation,
};
