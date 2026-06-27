import { describe, expect, it } from "vitest";
import { generateTimesEight } from "../../src/strategies/timesEight";

const ITERATIONS = 500;

const sample = (difficulty: Parameters<typeof generateTimesEight>[0]) =>
  Array.from({ length: ITERATIONS }, () => generateTimesEight(difficulty));

describe("generateTimesEight", () => {
  it("multiplies a number by eight", () => {
    for (const q of sample("easy")) {
      expect(q.operation).toBe("multiplication");
      expect(q.num2).toBe(8);
      expect(q.correctAnswer).toBe(q.num1 * 8);
    }
  });

  it("scales the multiplicand range up with difficulty", () => {
    const easyMax = Math.max(...sample("easy").map((q) => q.num1));
    const hardMax = Math.max(...sample("hard").map((q) => q.num1));
    expect(hardMax).toBeGreaterThan(easyMax);
  });
});
