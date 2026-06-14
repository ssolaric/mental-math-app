import { describe, expect, it } from "vitest";
import { generateSubCountUp } from "../../src/strategies/subCountUp";

const ITERATIONS = 500;
const sample = (difficulty: Parameters<typeof generateSubCountUp>[0]) =>
  Array.from({ length: ITERATIONS }, () => generateSubCountUp(difficulty));

describe("generateSubCountUp", () => {
  it("subtracts two operands that straddle a round number", () => {
    for (const q of sample("easy")) {
      expect(q.operation).toBe("subtraction");
      expect(q.num1).toBeGreaterThan(q.num2);
      expect(q.correctAnswer).toBe(q.num1 - q.num2);
      // a multiple of ten sits between the subtrahend and the minuend
      const crossing = Math.ceil(q.num2 / 10) * 10;
      expect(crossing).toBeLessThanOrEqual(q.num1);
      expect(crossing).toBeGreaterThan(q.num2);
    }
  });

  it("straddles a hundred on hard", () => {
    for (const q of sample("hard")) {
      const crossing = Math.ceil(q.num2 / 100) * 100;
      expect(crossing).toBeLessThanOrEqual(q.num1);
      expect(crossing).toBeGreaterThan(q.num2);
    }
  });
});
