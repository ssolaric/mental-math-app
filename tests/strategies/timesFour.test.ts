import { describe, expect, it } from "vitest";
import { generateTimesFour } from "../../src/strategies/timesFour";

const ITERATIONS = 500;

const sample = (difficulty: Parameters<typeof generateTimesFour>[0]) =>
  Array.from({ length: ITERATIONS }, () => generateTimesFour(difficulty));

describe("generateTimesFour", () => {
  it("multiplies a number by four", () => {
    for (const q of sample("easy")) {
      expect(q.operation).toBe("multiplication");
      expect(q.num2).toBe(4);
      expect(q.correctAnswer).toBe(q.num1 * 4);
    }
  });

  it("scales the multiplicand range up with difficulty", () => {
    const easyMax = Math.max(...sample("easy").map((q) => q.num1));
    const hardMax = Math.max(...sample("hard").map((q) => q.num1));
    expect(hardMax).toBeGreaterThan(easyMax);
  });
});
