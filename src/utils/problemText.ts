import type { Operation, Question } from "../types";

// Spoken operator words so screen readers announce the problem as a sentence
// rather than relying on how each SR voices "×" / "−" / "÷".
const OPERATION_WORDS: Record<Exclude<Operation, "power" | "root">, string> = {
  addition: "más",
  subtraction: "menos",
  multiplication: "por",
  division: "entre",
  percentage: "por ciento de",
};

const powerPhrase = (base: number, exponent: number): string => {
  if (exponent === 2) return `${base} al cuadrado`;
  if (exponent === 3) return `${base} al cubo`;
  return `${base} elevado a ${exponent}`;
};

const rootPhrase = (radicand: number, index: number): string => {
  const name = index === 3 ? "raíz cúbica" : "raíz cuadrada";
  return `la ${name} de ${radicand}`;
};

/**
 * The problem read aloud as a Spanish phrase — no leading "¿Cuánto es", no
 * answer. Shared by ArenaQuestion's accessible name and GameArena's wrong-answer
 * announcement so both voice power/root the same natural way.
 */
export const spokenProblem = (question: Question): string => {
  if (question.operation === "power") {
    return powerPhrase(question.num1, question.num2);
  }
  if (question.operation === "root") {
    return rootPhrase(question.num1, question.num2);
  }
  return `${question.num1} ${OPERATION_WORDS[question.operation]} ${question.num2}`;
};
