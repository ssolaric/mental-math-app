import type { Difficulty, Question } from "../types";
import type { Strategy } from "./types";
import { randomInt } from "./util";

// subtract from a round power of ten — the classic complement: 1000 − 376
const MINUEND: Record<Difficulty, number> = {
  easy: 100,
  medium: 1000,
  hard: 10000,
  expert: 10000,
};

export const generateSubComplement = (difficulty: Difficulty): Question => {
  const minuend = MINUEND[difficulty];
  const subtrahend = randomInt(1, minuend - 1);

  return {
    num1: minuend,
    num2: subtrahend,
    operation: "subtraction",
    correctAnswer: minuend - subtrahend,
    difficulty,
  };
};

export const subComplement: Strategy = {
  id: "sub-complement",
  operation: "subtraction",
  label: "Complemento a 100/1000",
  difficulties: ["easy", "medium", "hard"],
  describe: {
    easy: "100 − n",
    medium: "1000 − n",
    hard: "10000 − n",
  },
  example: "100 − 64 = 36",
  generate: generateSubComplement,
};
