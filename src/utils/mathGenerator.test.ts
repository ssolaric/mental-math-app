import { describe, expect, it } from "vitest";
import { DIFFICULTY_RANGES } from "../constants/difficulty";
import type { Difficulty, Operation } from "../types";
import { generateQuestion } from "./mathGenerator";

const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];
const ITERATIONS = 500;

// Exercise the random generators enough times that range/invariant violations
// surface reliably rather than flaking through.
const sample = (operation: Operation, difficulty: Difficulty) =>
  Array.from({ length: ITERATIONS }, () =>
    generateQuestion(operation, difficulty),
  );

describe("generateQuestion", () => {
  it("throws on an unknown operation", () => {
    expect(() => generateQuestion("modulo" as Operation, "easy")).toThrow(
      /Unknown operation/,
    );
  });

  for (const difficulty of DIFFICULTIES) {
    describe(`addition (${difficulty})`, () => {
      it("returns a correct sum within the configured ranges", () => {
        const range = DIFFICULTY_RANGES.addition[difficulty];
        for (const q of sample("addition", difficulty)) {
          expect(q.operation).toBe("addition");
          expect(q.correctAnswer).toBe(q.num1 + q.num2);
          expect(q.num1).toBeGreaterThanOrEqual(range.min1);
          expect(q.num1).toBeLessThanOrEqual(range.max1);
          expect(q.num2).toBeGreaterThanOrEqual(range.min2);
          expect(q.num2).toBeLessThanOrEqual(range.max2);
        }
      });
    });

    describe(`subtraction (${difficulty})`, () => {
      it("never produces a negative answer", () => {
        for (const q of sample("subtraction", difficulty)) {
          expect(q.correctAnswer).toBe(q.num1 - q.num2);
          expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
          expect(q.num1).toBeGreaterThanOrEqual(q.num2);
        }
      });
    });

    describe(`multiplication (${difficulty})`, () => {
      it("returns a correct product within the configured ranges", () => {
        const range = DIFFICULTY_RANGES.multiplication[difficulty];
        for (const q of sample("multiplication", difficulty)) {
          expect(q.correctAnswer).toBe(q.num1 * q.num2);
          expect(q.num1).toBeGreaterThanOrEqual(range.min1);
          expect(q.num1).toBeLessThanOrEqual(range.max1);
          expect(q.num2).toBeGreaterThanOrEqual(range.min2);
          expect(q.num2).toBeLessThanOrEqual(range.max2);
        }
      });
    });

    describe(`division (${difficulty})`, () => {
      it("always has an integer quotient and reconstructs the dividend", () => {
        for (const q of sample("division", difficulty)) {
          expect(Number.isInteger(q.correctAnswer)).toBe(true);
          expect(q.num2).not.toBe(0);
          expect(q.num1).toBe(q.num2 * q.correctAnswer);
        }
      });
    });
  }
});
