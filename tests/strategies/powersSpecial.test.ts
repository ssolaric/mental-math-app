import { describe, expect, it } from "vitest";
import { generatePowersSpecial } from "../../src/strategies/powersSpecial";

const ITERATIONS = 500;
const LEVELS = ["easy", "medium", "hard"] as const;
const sample = (difficulty: (typeof LEVELS)[number]) =>
  Array.from({ length: ITERATIONS }, () => generatePowersSpecial(difficulty));

describe("generatePowersSpecial", () => {
  it("raises a fixed base to an exponent and keeps results within the cap", () => {
    for (const level of LEVELS) {
      for (const q of sample(level)) {
        expect(q.operation).toBe("power");
        expect(q.correctAnswer).toBe(q.num1 ** q.num2);
        expect(q.num2).toBeGreaterThanOrEqual(2);
        // powers of two may reach 2^16 = 65536; everything else stays < 10000.
        const cap = q.num1 === 2 ? 65536 : 10000;
        expect(q.correctAnswer).toBeLessThanOrEqual(cap);
      }
    }
  });

  it("draws bases from the friendly/composite set only", () => {
    const allowed = new Set([2, 3, 5, 7, 11, 4, 6, 9, 12]);
    for (const level of LEVELS) {
      for (const q of sample(level)) {
        expect(allowed.has(q.num1)).toBe(true);
      }
    }
  });

  it("lets powers of two climb past 10000 on hard", () => {
    const maxTwo = Math.max(
      ...sample("hard")
        .filter((q) => q.num1 === 2)
        .map((q) => q.correctAnswer),
    );
    expect(maxTwo).toBeGreaterThan(10000);
    expect(maxTwo).toBeLessThanOrEqual(65536);
  });
});
