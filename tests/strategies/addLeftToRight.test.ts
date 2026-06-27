import { describe, expect, it } from "vitest";
import { generateAddLeftToRight } from "../../src/strategies/addLeftToRight";

const ITERATIONS = 500;

const sample = (difficulty: Parameters<typeof generateAddLeftToRight>[0]) =>
  Array.from({ length: ITERATIONS }, () => generateAddLeftToRight(difficulty));

describe("generateAddLeftToRight", () => {
  it("adds two multi-digit operands", () => {
    for (const q of sample("easy")) {
      expect(q.operation).toBe("addition");
      expect(q.correctAnswer).toBe(q.num1 + q.num2);
      // both operands carry at least two digits so there is a place to decompose
      expect(q.num1).toBeGreaterThanOrEqual(10);
      expect(q.num2).toBeGreaterThanOrEqual(10);
    }
  });

  it("scales the operand ranges up with difficulty", () => {
    for (const q of sample("hard")) {
      expect(q.num1).toBeGreaterThanOrEqual(100);
      expect(q.num2).toBeGreaterThanOrEqual(100);
    }
  });
});
