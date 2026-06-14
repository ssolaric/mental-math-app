import type { Difficulty, Question } from "../types";
import type { Strategy } from "./types";
import { nearRound, randomInt } from "./util";

// one operand sits just below/above a round number, so you round-then-adjust
const CONFIG: Record<
  Difficulty,
  {
    unit: number;
    rounds: [number, number];
    delta: number;
    other: [number, number];
  }
> = {
  easy: { unit: 10, rounds: [2, 9], delta: 2, other: [10, 99] },
  medium: { unit: 10, rounds: [3, 9], delta: 3, other: [10, 99] },
  hard: { unit: 100, rounds: [2, 9], delta: 3, other: [100, 999] },
  expert: { unit: 100, rounds: [2, 9], delta: 3, other: [100, 999] },
};

export const generateAddCompensation = (difficulty: Difficulty): Question => {
  const { unit, rounds, delta, other } = CONFIG[difficulty];
  const num1 = nearRound(unit, rounds, delta);
  const num2 = randomInt(other[0], other[1]);

  return {
    num1,
    num2,
    operation: "addition",
    correctAnswer: num1 + num2,
    difficulty,
  };
};

export const addCompensation: Strategy = {
  id: "add-compensation",
  operation: "addition",
  label: "Compensación",
  difficulties: ["easy", "medium", "hard"],
  describe: {
    easy: "casi-decena + 10-99",
    medium: "casi-decena + 10-99",
    hard: "casi-centena + 100-999",
  },
  generate: generateAddCompensation,
};
