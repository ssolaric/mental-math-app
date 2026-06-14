import { describe, expect, it } from "vitest";
import { generateDivideFive } from "../../src/strategies/divideFive";

const ITERATIONS = 500;
const sample = (difficulty: Parameters<typeof generateDivideFive>[0]) =>
  Array.from({ length: ITERATIONS }, () => generateDivideFive(difficulty));

describe("generateDivideFive", () => {
  it("divides a multiple of five by five, exactly", () => {
    for (const q of sample("medium")) {
      expect(q.operation).toBe("division");
      expect(q.num2).toBe(5);
      expect(q.num1 % 5).toBe(0);
      expect(q.correctAnswer).toBe(q.num1 / 5);
    }
  });

  it("scales the dividend up with difficulty", () => {
    const easyMax = Math.max(...sample("easy").map((q) => q.num1));
    const hardMax = Math.max(...sample("hard").map((q) => q.num1));
    expect(hardMax).toBeGreaterThan(easyMax);
  });
});
