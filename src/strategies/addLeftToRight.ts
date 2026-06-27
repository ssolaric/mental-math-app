import type { Difficulty, Question } from "../types";
import type { Strategy } from "./types";
import { randomInt } from "./util";

// Add by place value, left to right: hundreds first, then tens, then ones. Both
// operands are genuinely multi-digit so there is something to decompose.
const CONFIG: Record<Difficulty, { a: [number, number]; b: [number, number] }> =
  {
    easy: { a: [10, 99], b: [10, 99] },
    medium: { a: [100, 999], b: [10, 99] },
    hard: { a: [100, 999], b: [100, 999] },
    expert: { a: [100, 999], b: [100, 999] },
  };

export const generateAddLeftToRight = (difficulty: Difficulty): Question => {
  const { a, b } = CONFIG[difficulty];
  const num1 = randomInt(a[0], a[1]);
  const num2 = randomInt(b[0], b[1]);

  return {
    num1,
    num2,
    operation: "addition",
    correctAnswer: num1 + num2,
    difficulty,
  };
};

export const addLeftToRight: Strategy = {
  id: "add-left-to-right",
  operation: "addition",
  label: "Por partes",
  difficulties: ["easy", "medium", "hard"],
  describe: {
    easy: "10-99 + 10-99",
    medium: "100-999 + 10-99",
    hard: "100-999 + 100-999",
  },
  example: "324 + 251 = 575 (500+70+5)",
  generate: generateAddLeftToRight,
};
