import { describe, expect, it } from "vitest";
import { generateDivideFour } from "../../src/strategies/divideFour";

const ITERATIONS = 500;

const sample = (difficulty: Parameters<typeof generateDivideFour>[0]) =>
  Array.from({ length: ITERATIONS }, () => generateDivideFour(difficulty));

describe("generateDivideFour", () => {
  it("divides a multiple of four by four with an integer quotient", () => {
    for (const q of sample("medium")) {
      expect(q.operation).toBe("division");
      expect(q.num2).toBe(4);
      expect(q.num1 % 4).toBe(0);
      expect(q.correctAnswer).toBe(q.num1 / 4);
      expect(Number.isInteger(q.correctAnswer)).toBe(true);
    }
  });

  it("scales the dividend range up with difficulty", () => {
    const easyMax = Math.max(...sample("easy").map((q) => q.num1));
    const hardMax = Math.max(...sample("hard").map((q) => q.num1));
    expect(hardMax).toBeGreaterThan(easyMax);
  });
});
