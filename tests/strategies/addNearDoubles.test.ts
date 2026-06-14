import { describe, expect, it } from "vitest";
import { generateAddNearDoubles } from "../../src/strategies/addNearDoubles";

const ITERATIONS = 500;
const sample = (difficulty: Parameters<typeof generateAddNearDoubles>[0]) =>
  Array.from({ length: ITERATIONS }, () => generateAddNearDoubles(difficulty));

describe("generateAddNearDoubles", () => {
  it("adds two addends that differ by one or two", () => {
    for (const q of sample("medium")) {
      expect(q.operation).toBe("addition");
      expect([1, 2]).toContain(Math.abs(q.num1 - q.num2));
      expect(q.correctAnswer).toBe(q.num1 + q.num2);
    }
  });

  it("scales the addends up with difficulty", () => {
    const easyMax = Math.max(...sample("easy").map((q) => q.num1));
    const hardMax = Math.max(...sample("hard").map((q) => q.num1));
    expect(hardMax).toBeGreaterThan(easyMax);
  });
});
