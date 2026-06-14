import type { Difficulty, Question } from "../types";
import type { Strategy } from "./types";
import { randomInt } from "./util";

// the units sum overflows ten, so you split the addend to bridge: 8+5 = 8+2+3
const CONFIG: Record<
  Difficulty,
  { tens1: [number, number]; tens2: [number, number] }
> = {
  easy: { tens1: [0, 0], tens2: [0, 0] },
  medium: { tens1: [1, 9], tens2: [0, 0] },
  hard: { tens1: [1, 9], tens2: [1, 9] },
  expert: { tens1: [1, 9], tens2: [1, 9] },
};

export const generateAddBridgeTen = (difficulty: Difficulty): Question => {
  const { tens1, tens2 } = CONFIG[difficulty];
  const u1 = randomInt(2, 9);
  const u2 = randomInt(11 - u1, 9); // forces u1 + u2 >= 11
  const num1 = randomInt(tens1[0], tens1[1]) * 10 + u1;
  const num2 = randomInt(tens2[0], tens2[1]) * 10 + u2;

  return {
    num1,
    num2,
    operation: "addition",
    correctAnswer: num1 + num2,
    difficulty,
  };
};

export const addBridgeTen: Strategy = {
  id: "add-bridge-ten",
  operation: "addition",
  label: "Llegar a la decena",
  difficulties: ["easy", "medium", "hard"],
  describe: {
    easy: "un dígito + un dígito",
    medium: "dos dígitos + un dígito",
    hard: "dos dígitos + dos dígitos",
  },
  example: "8 + 5 = 8 + 2 + 3 = 13",
  generate: generateAddBridgeTen,
};
