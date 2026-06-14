import { describe, expect, it } from "vitest";
import { generateDivideFactors } from "../../src/strategies/divideFactors";

const ITERATIONS = 500;
const sample = (difficulty: Parameters<typeof generateDivideFactors>[0]) =>
  Array.from({ length: ITERATIONS }, () => generateDivideFactors(difficulty));

const isComposite = (n: number): boolean => {
  for (let d = 2; d * d <= n; d++) {
    if (n % d === 0) return true;
  }
  return false;
};

describe("generateDivideFactors", () => {
  it("divides exactly by a composite divisor", () => {
    for (const q of sample("medium")) {
      expect(q.operation).toBe("division");
      expect(isComposite(q.num2)).toBe(true);
      expect(q.num1 % q.num2).toBe(0);
      expect(q.correctAnswer).toBe(q.num1 / q.num2);
    }
  });

  it("raises the divisor size with difficulty", () => {
    for (const q of sample("easy")) expect(q.num2).toBe(6);
    for (const q of sample("hard")) expect([24, 36]).toContain(q.num2);
  });
});
