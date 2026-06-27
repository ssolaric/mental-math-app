import { DIFFICULTY_RANGES } from "../constants/difficulty";
import type { Difficulty, Operation, Question } from "../types";

const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateAddition = (difficulty: Difficulty): Question => {
  const range = DIFFICULTY_RANGES.addition[difficulty];
  const num1 = randomInt(range.min1, range.max1);
  const num2 = randomInt(range.min2, range.max2);

  return {
    num1,
    num2,
    operation: "addition",
    correctAnswer: num1 + num2,
    difficulty,
  };
};

const generateSubtraction = (difficulty: Difficulty): Question => {
  const range = DIFFICULTY_RANGES.subtraction[difficulty];
  let num1 = randomInt(range.min1, range.max1);
  let num2 = randomInt(range.min2, range.max2);

  // Ensure num1 >= num2 to avoid negative results
  if (num2 > num1) {
    [num1, num2] = [num2, num1];
  }

  return {
    num1,
    num2,
    operation: "subtraction",
    correctAnswer: num1 - num2,
    difficulty,
  };
};

const generateMultiplication = (difficulty: Difficulty): Question => {
  const range = DIFFICULTY_RANGES.multiplication[difficulty];
  const num1 = randomInt(range.min1, range.max1);
  const num2 = randomInt(range.min2, range.max2);

  return {
    num1,
    num2,
    operation: "multiplication",
    correctAnswer: num1 * num2,
    difficulty,
  };
};

const generateDivision = (difficulty: Difficulty): Question => {
  const range = DIFFICULTY_RANGES.division[difficulty];

  if (difficulty === "easy") {
    // For easy: generate from multiplication facts (1-9 × 1-9)
    const divisor = randomInt(range.min1, range.max1);
    const quotient = randomInt(range.min1, range.max1);
    const dividend = divisor * quotient;

    return {
      num1: dividend,
      num2: divisor,
      operation: "division",
      correctAnswer: quotient,
      difficulty,
    };
  } else {
    // For medium and hard: generate dividend in range, then find divisor that works
    const divisor = randomInt(range.min1, range.max1);
    const quotient = randomInt(
      Math.ceil(range.min2 / divisor),
      Math.floor(range.max2 / divisor),
    );
    const dividend = divisor * quotient;

    return {
      num1: dividend,
      num2: divisor,
      operation: "division",
      correctAnswer: quotient,
      difficulty,
    };
  }
};

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

// "Friendly" percents per level plus the base range they apply to. Bases are
// snapped to a multiple of 100/gcd(percent,100) so the answer is always a whole
// number (e.g. 25% needs a multiple of 4, 5% a multiple of 20).
const PERCENT_CONFIG: Record<
  Difficulty,
  { percents: number[]; base: [number, number] }
> = {
  easy: { percents: [10, 25, 50], base: [10, 100] },
  medium: { percents: [10, 20, 25, 50, 75], base: [20, 200] },
  hard: { percents: [5, 15, 30, 40, 60, 75], base: [20, 400] },
  expert: { percents: [5, 15, 35, 45, 65, 85], base: [50, 800] },
};

const generatePercentage = (difficulty: Difficulty): Question => {
  const { percents, base } = PERCENT_CONFIG[difficulty];
  const percent = percents[randomInt(0, percents.length - 1)];
  const step = 100 / gcd(percent, 100);
  const baseValue =
    randomInt(Math.ceil(base[0] / step), Math.floor(base[1] / step)) * step;

  return {
    num1: percent,
    num2: baseValue,
    operation: "percentage",
    correctAnswer: (percent * baseValue) / 100,
    difficulty,
  };
};

export const generateQuestion = (
  operation: Operation,
  difficulty: Difficulty,
): Question => {
  switch (operation) {
    case "addition":
      return generateAddition(difficulty);
    case "subtraction":
      return generateSubtraction(difficulty);
    case "multiplication":
      return generateMultiplication(difficulty);
    case "division":
      return generateDivision(difficulty);
    case "percentage":
      return generatePercentage(difficulty);
    default:
      throw new Error(`Unknown operation: ${operation}`);
  }
};
