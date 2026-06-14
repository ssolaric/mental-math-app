import { describe, expect, it } from "vitest";
import { generateHalving } from "../../src/strategies/halving";

const ITERATIONS = 500;
const sample = (difficulty: Parameters<typeof generateHalving>[0]) =>
  Array.from({ length: ITERATIONS }, () => generateHalving(difficulty));

describe("generateHalving", () => {
  it("halves an even number exactly", () => {
    for (const q of sample("medium")) {
      expect(q.operation).toBe("division");
      expect(q.num2).toBe(2);
      expect(q.num1 % 2).toBe(0);
      expect(q.correctAnswer).toBe(q.num1 / 2);
    }
  });

  it("scales the dividend range up with difficulty", () => {
    const easyMax = Math.max(...sample("easy").map((q) => q.num1));
    const hardMax = Math.max(...sample("hard").map((q) => q.num1));
    expect(hardMax).toBeGreaterThan(easyMax);
  });
});
