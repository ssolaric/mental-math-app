import { describe, expect, it } from "vitest";
import { generateTimesFive } from "../../src/strategies/timesFive";

const ITERATIONS = 500;
const sample = (difficulty: Parameters<typeof generateTimesFive>[0]) =>
  Array.from({ length: ITERATIONS }, () => generateTimesFive(difficulty));

describe("generateTimesFive", () => {
  it("multiplies a number by five", () => {
    for (const q of sample("medium")) {
      expect(q.operation).toBe("multiplication");
      expect(q.num2).toBe(5);
      expect(q.correctAnswer).toBe(q.num1 * 5);
    }
  });

  it("scales the multiplicand range up with difficulty", () => {
    const easyMax = Math.max(...sample("easy").map((q) => q.num1));
    const hardMax = Math.max(...sample("hard").map((q) => q.num1));
    expect(hardMax).toBeGreaterThan(easyMax);
  });
});
