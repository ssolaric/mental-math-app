import type { Difficulty, Question } from "../types";
import type { Strategy } from "./types";
import { nearRound, randomInt } from "./util";

// "Same difference": shift both numbers by the same amount so the subtrahend
// lands on a round number — the gap (the answer) is unchanged. The subtrahend
// sits near a round number so there is a small shift to make.
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
  medium: { unit: 10, rounds: [2, 9], delta: 2, spread: [10, 90] },
  hard: { unit: 100, rounds: [1, 8], delta: 3, spread: [20, 200] },
  expert: { unit: 100, rounds: [1, 8], delta: 3, spread: [20, 200] },
};

export const generateSubSameDifference = (difficulty: Difficulty): Question => {
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

export const subSameDifference: Strategy = {
  id: "sub-same-difference",
  operation: "subtraction",
  label: "Misma diferencia",
  difficulties: ["easy", "medium", "hard"],
  describe: {
    easy: "ajustar a decena",
    medium: "ajustar a decena",
    hard: "ajustar a centena",
  },
  example: "83 − 29 = 84 − 30 = 54",
  generate: generateSubSameDifference,
};
