import { describe, expect, it } from "vitest";
import { generatePowersBasic } from "../../src/strategies/powersBasic";

const ITERATIONS = 500;
const LEVELS = ["easy", "medium", "hard"] as const;
const sample = (difficulty: "easy" | "medium" | "hard" | "expert") =>
  Array.from({ length: ITERATIONS }, () => generatePowersBasic(difficulty));

describe("generatePowersBasic", () => {
  it("raises an integer base to its exponent, every result under 10000", () => {
    for (const level of LEVELS) {
      for (const q of sample(level)) {
        expect(q.operation).toBe("power");
        expect(q.correctAnswer).toBe(q.num1 ** q.num2);
        expect(q.num1).toBeGreaterThanOrEqual(2);
        expect(q.num2).toBeGreaterThanOrEqual(2);
        expect(q.num2).toBeLessThanOrEqual(5);
        expect(q.correctAnswer).toBeLessThan(10000);
      }
    }
  });

  it("limits easy to squares and small cubes", () => {
    const exponents = new Set(sample("easy").map((q) => q.num2));
    expect([...exponents].every((e) => e === 2 || e === 3)).toBe(true);
  });

  it("introduces 4th and 5th powers by hard", () => {
    const exponents = new Set(sample("hard").map((q) => q.num2));
    expect(exponents.has(4)).toBe(true);
    expect(exponents.has(5)).toBe(true);
  });

  it("pushes expert past hard's 10000 ceiling but under 100000", () => {
    const results = sample("expert").map((q) => q.correctAnswer);
    expect(Math.max(...results)).toBeGreaterThan(10000);
    for (const r of results) {
      expect(r).toBeLessThan(100000);
    }
  });
});
