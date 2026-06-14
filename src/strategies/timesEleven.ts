import type { Difficulty, Question } from "../types";
import type { Strategy } from "./types";
import { randomInt } from "./util";

const generateMultiplicand = (difficulty: Difficulty): number => {
  if (difficulty === "easy") {
    // two-digit, tens + units <= 9 so the digits never carry when inserted
    const tens = randomInt(1, 9);
    const units = randomInt(0, 9 - tens);
    return tens * 10 + units;
  }
  if (difficulty === "hard") {
    return randomInt(100, 999);
  }
  return randomInt(10, 99);
};

export const generateTimesEleven = (difficulty: Difficulty): Question => {
  const multiplicand = generateMultiplicand(difficulty);

  return {
    num1: multiplicand,
    num2: 11,
    operation: "multiplication",
    correctAnswer: multiplicand * 11,
    difficulty,
  };
};

export const timesEleven: Strategy = {
  id: "times-eleven",
  operation: "multiplication",
  label: "Por 11",
  difficulties: ["easy", "medium", "hard"],
  describe: {
    easy: "10-99 × 11 (sin llevar)",
    medium: "10-99 × 11",
    hard: "100-999 × 11",
  },
  example: "37 × 11 = 407",
  generate: generateTimesEleven,
};
