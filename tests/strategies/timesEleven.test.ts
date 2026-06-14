import { describe, expect, it } from "vitest";
import { generateTimesEleven } from "../../src/strategies/timesEleven";

const ITERATIONS = 500;

const sample = (difficulty: Parameters<typeof generateTimesEleven>[0]) =>
  Array.from({ length: ITERATIONS }, () => generateTimesEleven(difficulty));

describe("generateTimesEleven", () => {
  it("multiplies a number by eleven", () => {
    for (const q of sample("easy")) {
      expect(q.operation).toBe("multiplication");
      expect(q.num2).toBe(11);
      expect(q.correctAnswer).toBe(q.num1 * 11);
    }
  });

  it("easy uses a two-digit multiplicand whose digits never carry", () => {
    // the clean 'split and insert the sum' trick: 23×11 = 2_(2+3)_3 = 253
    for (const q of sample("easy")) {
      expect(q.num1).toBeGreaterThanOrEqual(10);
      expect(q.num1).toBeLessThanOrEqual(99);
      const tens = Math.floor(q.num1 / 10);
      const units = q.num1 % 10;
      expect(tens + units).toBeLessThanOrEqual(9);
    }
  });

  it("medium uses any two-digit multiplicand, including carrying ones", () => {
    const samples = sample("medium");
    for (const q of samples) {
      expect(q.num1).toBeGreaterThanOrEqual(10);
      expect(q.num1).toBeLessThanOrEqual(99);
    }
    // medium is harder than easy: at least some multiplicands carry
    const anyCarry = samples.some(
      (q) => Math.floor(q.num1 / 10) + (q.num1 % 10) > 9,
    );
    expect(anyCarry).toBe(true);
  });

  it("hard uses a three-digit multiplicand", () => {
    for (const q of sample("hard")) {
      expect(q.num1).toBeGreaterThanOrEqual(100);
      expect(q.num1).toBeLessThanOrEqual(999);
    }
  });
});
