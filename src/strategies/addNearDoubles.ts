import type { Difficulty, Question } from "../types";
import type { Strategy } from "./types";
import { pick, randomInt } from "./util";

// the addends differ by 1 or 2, so you lean on a known double: 6+7 = 6+6+1
const ANCHOR_RANGE: Record<Difficulty, [number, number]> = {
  easy: [3, 9],
  medium: [10, 50],
  hard: [20, 99],
  expert: [20, 99],
};

export const generateAddNearDoubles = (difficulty: Difficulty): Question => {
  const [min, max] = ANCHOR_RANGE[difficulty];
  const num1 = randomInt(min, max);
  const gap = pick([1, 2]);
  const num2 = num1 + gap; // always positive, |num1 - num2| in {1,2}

  return {
    num1,
    num2,
    operation: "addition",
    correctAnswer: num1 + num2,
    difficulty,
  };
};

export const addNearDoubles: Strategy = {
  id: "add-near-doubles",
  operation: "addition",
  label: "Casi dobles",
  difficulties: ["easy", "medium", "hard"],
  describe: {
    easy: "sumandos 3-9",
    medium: "sumandos 10-50",
    hard: "sumandos 20-99",
  },
  generate: generateAddNearDoubles,
};
