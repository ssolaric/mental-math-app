import { describe, expect, it } from "vitest";
import { generateSquaresEndingFive } from "../../src/strategies/squaresEndingFive";

const ITERATIONS = 500;
const sample = (difficulty: Parameters<typeof generateSquaresEndingFive>[0]) =>
  Array.from({ length: ITERATIONS }, () =>
    generateSquaresEndingFive(difficulty),
  );

describe("generateSquaresEndingFive", () => {
  it("squares a number that ends in five", () => {
    for (const q of sample("medium")) {
      expect(q.operation).toBe("multiplication");
      expect(q.num1).toBe(q.num2);
      expect(q.num1 % 10).toBe(5);
      expect(q.correctAnswer).toBe(q.num1 * q.num1);
    }
  });

  it("uses two-digit bases on easy/medium and three-digit on hard", () => {
    for (const q of sample("easy")) {
      expect(q.num1).toBeGreaterThanOrEqual(15);
      expect(q.num1).toBeLessThanOrEqual(95);
    }
    for (const q of sample("hard")) {
      expect(q.num1).toBeGreaterThanOrEqual(105);
      expect(q.num1).toBeLessThanOrEqual(195);
    }
  });
});
