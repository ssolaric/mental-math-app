import { describe, expect, it } from "vitest";
import { generateAddBridgeTen } from "../../src/strategies/addBridgeTen";

const ITERATIONS = 500;
const sample = (difficulty: Parameters<typeof generateAddBridgeTen>[0]) =>
  Array.from({ length: ITERATIONS }, () => generateAddBridgeTen(difficulty));

describe("generateAddBridgeTen", () => {
  it("adds two numbers whose units cross a ten", () => {
    for (const q of sample("medium")) {
      expect(q.operation).toBe("addition");
      expect((q.num1 % 10) + (q.num2 % 10)).toBeGreaterThanOrEqual(10);
      expect(q.correctAnswer).toBe(q.num1 + q.num2);
    }
  });

  it("uses single digits on easy and two-digit operands on hard", () => {
    for (const q of sample("easy")) {
      expect(q.num1).toBeLessThanOrEqual(9);
      expect(q.num2).toBeLessThanOrEqual(9);
    }
    for (const q of sample("hard")) {
      expect(q.num1).toBeGreaterThanOrEqual(10);
      expect(q.num2).toBeGreaterThanOrEqual(10);
    }
  });
});
