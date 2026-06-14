import { describe, expect, it } from "vitest";
import { generateTimesNineNine } from "../../src/strategies/timesNineNine";

const ITERATIONS = 500;
const sample = (difficulty: Parameters<typeof generateTimesNineNine>[0]) =>
  Array.from({ length: ITERATIONS }, () => generateTimesNineNine(difficulty));

describe("generateTimesNineNine", () => {
  it("multiplies a number by ninety-nine", () => {
    for (const q of sample("medium")) {
      expect(q.operation).toBe("multiplication");
      expect(q.num2).toBe(99);
      expect(q.correctAnswer).toBe(q.num1 * 99);
    }
  });

  it("scales the multiplicand range up with difficulty", () => {
    const easyMax = Math.max(...sample("easy").map((q) => q.num1));
    const hardMax = Math.max(...sample("hard").map((q) => q.num1));
    expect(hardMax).toBeGreaterThan(easyMax);
  });
});
