import type { Question } from "../types";

export const validateAnswer = (
  userAnswer: string,
  question: Question,
): boolean => {
  const parsedAnswer = parseInt(userAnswer, 10);

  if (isNaN(parsedAnswer)) {
    return false;
  }

  return parsedAnswer === question.correctAnswer;
};

export const isValidNumber = (value: string): boolean => {
  if (value === "" || value === "-") {
    return true; // Allow empty or just minus sign during typing
  }

  const num = parseInt(value, 10);
  return !isNaN(num);
};
