import { describe, expect, it } from "vitest";
import { generateDoubling } from "../../src/strategies/doubling";

const ITERATIONS = 500;
const sample = (difficulty: Parameters<typeof generateDoubling>[0]) =>
  Array.from({ length: ITERATIONS }, () => generateDoubling(difficulty));

describe("generateDoubling", () => {
  it("doubles a number", () => {
    for (const q of sample("medium")) {
      expect(q.operation).toBe("multiplication");
      expect(q.num2).toBe(2);
      expect(q.correctAnswer).toBe(q.num1 * 2);
    }
  });

  it("scales the number range up with difficulty", () => {
    const easyMax = Math.max(...sample("easy").map((q) => q.num1));
    const hardMax = Math.max(...sample("hard").map((q) => q.num1));
    expect(hardMax).toBeGreaterThan(easyMax);
  });
});
