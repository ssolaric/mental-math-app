import { describe, expect, it } from "vitest";
import { generateTimesTwentyFive } from "../../src/strategies/timesTwentyFive";

const ITERATIONS = 500;

const sample = (difficulty: Parameters<typeof generateTimesTwentyFive>[0]) =>
  Array.from({ length: ITERATIONS }, () => generateTimesTwentyFive(difficulty));

describe("generateTimesTwentyFive", () => {
  it("multiplies a number by twenty-five", () => {
    for (const q of sample("easy")) {
      expect(q.operation).toBe("multiplication");
      expect(q.num2).toBe(25);
      expect(q.correctAnswer).toBe(q.num1 * 25);
    }
  });

  it("scales the multiplicand range up with difficulty", () => {
    const easyMax = Math.max(...sample("easy").map((q) => q.num1));
    const hardMax = Math.max(...sample("hard").map((q) => q.num1));
    expect(hardMax).toBeGreaterThan(easyMax);
  });
});
