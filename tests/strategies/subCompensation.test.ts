import { describe, expect, it } from "vitest";
import { generateSubCompensation } from "../../src/strategies/subCompensation";

const ITERATIONS = 500;
const sample = (difficulty: Parameters<typeof generateSubCompensation>[0]) =>
  Array.from({ length: ITERATIONS }, () => generateSubCompensation(difficulty));

const distanceTo = (n: number, unit: number): number => {
  const rem = n % unit;
  return Math.min(rem, unit - rem);
};

describe("generateSubCompensation", () => {
  it("subtracts a near-round subtrahend, never going negative", () => {
    for (const q of sample("medium")) {
      expect(q.operation).toBe("subtraction");
      expect(q.num1).toBeGreaterThanOrEqual(q.num2);
      expect(q.correctAnswer).toBe(q.num1 - q.num2);
    }
  });

  it("keeps the subtrahend within delta of a round number", () => {
    for (const q of sample("easy")) {
      expect(distanceTo(q.num2, 10)).toBeLessThanOrEqual(2);
    }
    for (const q of sample("hard")) {
      expect(distanceTo(q.num2, 100)).toBeLessThanOrEqual(3);
    }
  });
});
