import { describe, expect, it } from "vitest";
import { generateRootExact } from "../../src/strategies/rootExact";

const ITERATIONS = 500;
const LEVELS = ["easy", "medium", "hard"] as const;
const sample = (difficulty: "easy" | "medium" | "hard" | "expert") =>
  Array.from({ length: ITERATIONS }, () => generateRootExact(difficulty));

describe("generateRootExact", () => {
  it("produces a perfect radicand whose exact root is the answer", () => {
    for (const level of LEVELS) {
      for (const q of sample(level)) {
        expect(q.operation).toBe("root");
        expect([2, 3]).toContain(q.num2);
        expect(q.correctAnswer ** q.num2).toBe(q.num1);
        expect(q.num1).toBeLessThan(10000);
        expect(q.correctAnswer).toBeGreaterThanOrEqual(2);
      }
    }
  });

  it("offers only square roots on easy", () => {
    expect(sample("easy").every((q) => q.num2 === 2)).toBe(true);
  });

  it("adds cube roots from medium onward", () => {
    expect(sample("medium").some((q) => q.num2 === 3)).toBe(true);
    expect(sample("hard").some((q) => q.num2 === 3)).toBe(true);
  });

  it("pushes expert past hard's 10000 ceiling but under 100000", () => {
    const radicands = sample("expert").map((q) => q.num1);
    expect(Math.max(...radicands)).toBeGreaterThan(10000);
    for (const r of radicands) {
      expect(r).toBeLessThan(100000);
    }
  });
});
