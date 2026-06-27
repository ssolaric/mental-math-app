import { describe, expect, it } from "vitest";
import { generateRootApprox } from "../../src/strategies/rootApprox";

const ITERATIONS = 500;
const LEVELS = ["easy", "medium", "hard"] as const;
const sample = (difficulty: (typeof LEVELS)[number]) =>
  Array.from({ length: ITERATIONS }, () => generateRootApprox(difficulty));

describe("generateRootApprox", () => {
  it("answers with the integer floor of the root and never an exact root", () => {
    for (const level of LEVELS) {
      for (const q of sample(level)) {
        expect(q.operation).toBe("root");
        expect([2, 3]).toContain(q.num2);
        expect(q.num1).toBeLessThan(10000);
        // floor: answer^index <= radicand < (answer+1)^index
        expect(q.correctAnswer ** q.num2).toBeLessThanOrEqual(q.num1);
        expect((q.correctAnswer + 1) ** q.num2).toBeGreaterThan(q.num1);
        // genuinely approximate: the radicand is never a perfect power
        expect(q.correctAnswer ** q.num2).not.toBe(q.num1);
      }
    }
  });

  it("offers only square roots on easy", () => {
    expect(sample("easy").every((q) => q.num2 === 2)).toBe(true);
  });

  it("adds cube roots from medium onward", () => {
    expect(sample("medium").some((q) => q.num2 === 3)).toBe(true);
  });
});
