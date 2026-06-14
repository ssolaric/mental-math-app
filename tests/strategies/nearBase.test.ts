import { describe, expect, it } from "vitest";
import { generateNearBase } from "../../src/strategies/nearBase";

const ITERATIONS = 500;
const sample = (difficulty: Parameters<typeof generateNearBase>[0]) =>
  Array.from({ length: ITERATIONS }, () => generateNearBase(difficulty));

const nearestBase = (n: number): number =>
  n >= 500 ? 1000 : n >= 50 ? 100 : 10;

describe("generateNearBase", () => {
  it("multiplies two factors near a power-of-ten base", () => {
    for (const q of sample("medium")) {
      expect(q.operation).toBe("multiplication");
      expect(q.correctAnswer).toBe(q.num1 * q.num2);
    }
  });

  it("keeps both factors within the difficulty's spread of the base", () => {
    for (const q of sample("easy")) {
      const base = nearestBase(q.num1);
      expect(Math.abs(q.num1 - base)).toBeLessThanOrEqual(4);
      expect(Math.abs(q.num2 - base)).toBeLessThanOrEqual(4);
    }
    for (const q of sample("hard")) {
      expect(Math.abs(q.num1 - 1000)).toBeLessThanOrEqual(9);
      expect(Math.abs(q.num2 - 1000)).toBeLessThanOrEqual(9);
    }
  });
});
