import { describe, expect, it } from "vitest";
import { generateAddCompensation } from "../../src/strategies/addCompensation";

const ITERATIONS = 500;
const sample = (difficulty: Parameters<typeof generateAddCompensation>[0]) =>
  Array.from({ length: ITERATIONS }, () => generateAddCompensation(difficulty));

const distanceTo = (n: number, unit: number): number => {
  const rem = n % unit;
  return Math.min(rem, unit - rem);
};

describe("generateAddCompensation", () => {
  it("adds two numbers", () => {
    for (const q of sample("medium")) {
      expect(q.operation).toBe("addition");
      expect(q.correctAnswer).toBe(q.num1 + q.num2);
    }
  });

  it("keeps the first operand within delta of a round number", () => {
    for (const q of sample("easy")) {
      expect(distanceTo(q.num1, 10)).toBeLessThanOrEqual(2);
    }
    for (const q of sample("hard")) {
      expect(distanceTo(q.num1, 100)).toBeLessThanOrEqual(3);
    }
  });
});
