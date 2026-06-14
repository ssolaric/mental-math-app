import { describe, expect, it } from "vitest";
import { generateSuccessiveHalving } from "../../src/strategies/successiveHalving";

const ITERATIONS = 500;
const sample = (difficulty: Parameters<typeof generateSuccessiveHalving>[0]) =>
  Array.from({ length: ITERATIONS }, () =>
    generateSuccessiveHalving(difficulty),
  );

describe("generateSuccessiveHalving", () => {
  it("divides exactly by a power of two reachable by halving", () => {
    for (const q of sample("medium")) {
      expect(q.operation).toBe("division");
      expect([4, 8]).toContain(q.num2);
      expect(q.num1 % q.num2).toBe(0);
      expect(q.correctAnswer).toBe(q.num1 / q.num2);
    }
  });

  it("uses ÷4 on easy and ÷8 on medium", () => {
    for (const q of sample("easy")) expect(q.num2).toBe(4);
    for (const q of sample("medium")) expect(q.num2).toBe(8);
  });
});
