import { describe, expect, it } from "vitest";
import { DIFFICULTY_RANGES } from "../../src/constants/difficulty";
import type { Difficulty, Operation } from "../../src/types";
import { generateQuestion } from "../../src/utils/mathGenerator";

const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard", "expert"];
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

  // Item #2: subtraction easy was trivial (5-9 − 1-5, never borrowing). Easy now
  // uses teen minuends so single-digit borrowing is exercised.
  describe("subtraction (easy)", () => {
    it("uses a teen minuend so borrowing is possible", () => {
      for (const q of sample("subtraction", "easy")) {
        expect(q.num1).toBeGreaterThanOrEqual(10);
      }
    });
  });

  // Item #2: subtraction medium allowed a subtrahend as small as 1 (e.g. 99 − 1),
  // making difficulty wildly inconsistent. The smaller operand is now always
  // two-digit so every medium problem is genuine 2-digit work.
  describe("subtraction (medium)", () => {
    it("subtracts a two-digit number", () => {
      for (const q of sample("subtraction", "medium")) {
        expect(q.num2).toBeGreaterThanOrEqual(10);
      }
    });
  });

  // Item #4: expert division steps beyond hard's 1-digit divisor to a 2-digit
  // divisor over a 3-digit dividend, still exact (integer quotient).
  describe("division (expert)", () => {
    it("divides a 3-digit dividend by a 2-digit divisor", () => {
      for (const q of sample("division", "expert")) {
        expect(q.num1).toBeGreaterThanOrEqual(100);
        expect(q.num1).toBeLessThanOrEqual(999);
        expect(q.num2).toBeGreaterThanOrEqual(10);
      }
    });
  });

  // Item #3: multiplication hard capped at 2-digit × 1-digit (10-25 × 2-9). Hard
  // is now genuine 2-digit × 2-digit, the real mental-multiplication milestone.
  describe("multiplication (hard)", () => {
    it("multiplies two two-digit numbers", () => {
      for (const q of sample("multiplication", "hard")) {
        expect(q.num1).toBeGreaterThanOrEqual(10);
        expect(q.num2).toBeGreaterThanOrEqual(10);
      }
    });
  });

  // Item #1: division hard was a near-duplicate of medium. Hard must step up to
  // a genuine 3-digit dividend so it is distinct from medium's 2-digit dividend.
  describe("division (hard)", () => {
    it("uses a 3-digit dividend", () => {
      for (const q of sample("division", "hard")) {
        expect(q.num1).toBeGreaterThanOrEqual(100);
        expect(q.num1).toBeLessThanOrEqual(999);
      }
    });
  });
});
