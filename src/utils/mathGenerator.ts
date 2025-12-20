import type { Operation, Difficulty, Question } from '../types';
import { DIFFICULTY_RANGES } from '../constants/gameConfig';

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
    operation: 'addition',
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
    operation: 'subtraction',
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
    operation: 'multiplication',
    correctAnswer: num1 * num2,
    difficulty,
  };
};

const generateDivision = (difficulty: Difficulty): Question => {
  const range = DIFFICULTY_RANGES.division[difficulty];

  if (difficulty === 'easy') {
    // For easy: generate from multiplication facts (1-9 × 1-9)
    const divisor = randomInt(range.min1, range.max1);
    const quotient = randomInt(range.min1, range.max1);
    const dividend = divisor * quotient;

    return {
      num1: dividend,
      num2: divisor,
      operation: 'division',
      correctAnswer: quotient,
      difficulty,
    };
  } else {
    // For medium and hard: generate dividend in range, then find divisor that works
    const divisor = randomInt(range.min1, range.max1);
    const quotient = randomInt(
      Math.ceil(range.min2 / divisor),
      Math.floor(range.max2 / divisor)
    );
    const dividend = divisor * quotient;

    return {
      num1: dividend,
      num2: divisor,
      operation: 'division',
      correctAnswer: quotient,
      difficulty,
    };
  }
};

export const generateQuestion = (operation: Operation, difficulty: Difficulty): Question => {
  switch (operation) {
    case 'addition':
      return generateAddition(difficulty);
    case 'subtraction':
      return generateSubtraction(difficulty);
    case 'multiplication':
      return generateMultiplication(difficulty);
    case 'division':
      return generateDivision(difficulty);
    default:
      throw new Error(`Unknown operation: ${operation}`);
  }
};
