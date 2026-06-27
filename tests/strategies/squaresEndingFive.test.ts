import { describe, expect, it } from "vitest";
import { generateSquaresEndingFive } from "../../src/strategies/squaresEndingFive";

const ITERATIONS = 500;
const sample = (difficulty: Parameters<typeof generateSquaresEndingFive>[0]) =>
  Array.from({ length: ITERATIONS }, () =>
    generateSquaresEndingFive(difficulty),
  );

describe("generateSquaresEndingFive", () => {
  it("squares a number that ends in five", () => {
    for (const q of sample("medium")) {
      expect(q.operation).toBe("multiplication");
      expect(q.num1).toBe(q.num2);
      expect(q.num1 % 10).toBe(5);
      expect(q.correctAnswer).toBe(q.num1 * q.num1);
    }
  });

  it("climbs the base range across tiers, every base ending in five", () => {
    // Tiers reach into three-digit bases so each pool stays well above a round's
    // length (only nine two-digit numbers end in 5), but the technique is the same.
    for (const q of sample("easy")) {
      expect(q.num1).toBeGreaterThanOrEqual(15);
      expect(q.num1).toBeLessThanOrEqual(205);
      expect(q.num1 % 10).toBe(5);
    }
    for (const q of sample("medium")) {
      expect(q.num1).toBeGreaterThanOrEqual(215);
      expect(q.num1).toBeLessThanOrEqual(555);
    }
    for (const q of sample("hard")) {
      expect(q.num1).toBeGreaterThanOrEqual(565);
      expect(q.num1).toBeLessThanOrEqual(995);
    }
  });
});
