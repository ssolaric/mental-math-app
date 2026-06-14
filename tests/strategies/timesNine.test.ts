import { describe, expect, it } from "vitest";
import { generateTimesNine } from "../../src/strategies/timesNine";

const ITERATIONS = 500;
const sample = (difficulty: Parameters<typeof generateTimesNine>[0]) =>
  Array.from({ length: ITERATIONS }, () => generateTimesNine(difficulty));

describe("generateTimesNine", () => {
  it("multiplies a number by nine", () => {
    for (const q of sample("medium")) {
      expect(q.operation).toBe("multiplication");
      expect(q.num2).toBe(9);
      expect(q.correctAnswer).toBe(q.num1 * 9);
    }
  });

  it("scales the multiplicand range up with difficulty", () => {
    const easyMax = Math.max(...sample("easy").map((q) => q.num1));
    const hardMax = Math.max(...sample("hard").map((q) => q.num1));
    expect(hardMax).toBeGreaterThan(easyMax);
  });
});
