import { describe, expect, it } from "vitest";
import type { Question } from "../types";
import { isValidNumber, validateAnswer } from "./validators";

const question = (correctAnswer: number): Question => ({
  num1: 0,
  num2: 0,
  operation: "addition",
  correctAnswer,
  difficulty: "easy",
});

describe("validateAnswer", () => {
  it("accepts a string that parses to the correct answer", () => {
    expect(validateAnswer("42", question(42))).toBe(true);
  });

  it("rejects a string that parses to a different number", () => {
    expect(validateAnswer("41", question(42))).toBe(false);
  });

  it("rejects non-numeric input", () => {
    expect(validateAnswer("abc", question(42))).toBe(false);
    expect(validateAnswer("", question(42))).toBe(false);
  });

  it("matches a negative correct answer", () => {
    expect(validateAnswer("-7", question(-7))).toBe(true);
  });

  it("ignores trailing non-digit characters the way parseInt does", () => {
    // parseInt("42px") === 42 — documents the lenient parsing behavior
    expect(validateAnswer("42px", question(42))).toBe(true);
  });
});

describe("isValidNumber", () => {
  it("treats an empty string as valid mid-typing", () => {
    expect(isValidNumber("")).toBe(true);
  });

  it("treats a lone minus sign as valid mid-typing", () => {
    expect(isValidNumber("-")).toBe(true);
  });

  it("accepts a parseable number", () => {
    expect(isValidNumber("123")).toBe(true);
    expect(isValidNumber("-5")).toBe(true);
  });

  it("rejects non-numeric text", () => {
    expect(isValidNumber("abc")).toBe(false);
  });
});
