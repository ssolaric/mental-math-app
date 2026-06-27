import { describe, expect, it } from "vitest";
import { generateDivideTwentyFive } from "../../src/strategies/divideTwentyFive";

const ITERATIONS = 500;

const sample = (difficulty: Parameters<typeof generateDivideTwentyFive>[0]) =>
  Array.from({ length: ITERATIONS }, () =>
    generateDivideTwentyFive(difficulty),
  );

describe("generateDivideTwentyFive", () => {
  it("divides a multiple of 25 by 25 with an integer quotient", () => {
    for (const q of sample("medium")) {
      expect(q.operation).toBe("division");
      expect(q.num2).toBe(25);
      expect(q.num1 % 25).toBe(0);
      expect(q.correctAnswer).toBe(q.num1 / 25);
      expect(Number.isInteger(q.correctAnswer)).toBe(true);
    }
  });

  it("scales the dividend range up with difficulty", () => {
    const easyMax = Math.max(...sample("easy").map((q) => q.num1));
    const hardMax = Math.max(...sample("hard").map((q) => q.num1));
    expect(hardMax).toBeGreaterThan(easyMax);
  });
});
