import { describe, expect, it } from "vitest";
import { generateSubComplement } from "../../src/strategies/subComplement";

const ITERATIONS = 500;
const sample = (difficulty: Parameters<typeof generateSubComplement>[0]) =>
  Array.from({ length: ITERATIONS }, () => generateSubComplement(difficulty));

describe("generateSubComplement", () => {
  it("subtracts from a round power of ten with a positive result", () => {
    for (const q of sample("medium")) {
      expect(q.operation).toBe("subtraction");
      expect(q.num1).toBe(1000);
      expect(q.num2).toBeGreaterThanOrEqual(1);
      expect(q.num2).toBeLessThan(q.num1);
      expect(q.correctAnswer).toBe(q.num1 - q.num2);
    }
  });

  it("raises the round minuend with difficulty", () => {
    for (const q of sample("easy")) expect(q.num1).toBe(100);
    for (const q of sample("hard")) expect(q.num1).toBe(10000);
  });
});
