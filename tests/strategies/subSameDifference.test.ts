import { describe, expect, it } from "vitest";
import { generateSubSameDifference } from "../../src/strategies/subSameDifference";

const ITERATIONS = 500;
const sample = (difficulty: Parameters<typeof generateSubSameDifference>[0]) =>
  Array.from({ length: ITERATIONS }, () =>
    generateSubSameDifference(difficulty),
  );

const distanceTo = (n: number, unit: number): number => {
  const rem = n % unit;
  return Math.min(rem, unit - rem);
};

describe("generateSubSameDifference", () => {
  it("subtracts a near-round subtrahend, never going negative", () => {
    for (const q of sample("medium")) {
      expect(q.operation).toBe("subtraction");
      expect(q.num1).toBeGreaterThanOrEqual(q.num2);
      expect(q.correctAnswer).toBe(q.num1 - q.num2);
    }
  });

  it("keeps the subtrahend near a round number so the shift is small", () => {
    for (const q of sample("easy")) {
      expect(distanceTo(q.num2, 10)).toBeLessThanOrEqual(2);
    }
    for (const q of sample("hard")) {
      expect(distanceTo(q.num2, 100)).toBeLessThanOrEqual(3);
    }
  });
});
