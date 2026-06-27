import { describe, expect, it } from "vitest";
import {
  generateForRound,
  getStrategy,
  questionKey,
  strategiesForOperation,
} from "../../src/strategies";

describe("strategy registry", () => {
  it("exposes the times-eleven strategy under multiplication", () => {
    const strategy = getStrategy("times-eleven");
    expect(strategy.operation).toBe("multiplication");
    expect(strategy.label.length).toBeGreaterThan(0);
    expect(strategy.difficulties).toEqual(["easy", "medium", "hard"]);
  });

  it("lists strategies belonging to an operation", () => {
    expect(strategiesForOperation("multiplication").map((s) => s.id)).toContain(
      "times-eleven",
    );
    // every listed strategy actually belongs to the requested operation
    for (const s of strategiesForOperation("addition")) {
      expect(s.operation).toBe("addition");
    }
    expect(strategiesForOperation("addition").map((s) => s.id)).toContain(
      "add-compensation",
    );
  });

  it("generateForRound dispatches to the strategy when one is given", () => {
    const q = generateForRound("multiplication", "easy", "times-eleven");
    expect(q.num2).toBe(11);
    expect(q.correctAnswer).toBe(q.num1 * 11);
  });

  it("generateForRound falls back to the standard generator without a strategy", () => {
    const q = generateForRound("addition", "easy");
    expect(q.operation).toBe("addition");
    expect(q.correctAnswer).toBe(q.num1 + q.num2);
  });

  it("generateForRound avoids keys already seen this round", () => {
    // A round's worth of draws from a small fixed-pool strategy (powers-special
    // easy offers 16 distinct operations) must never repeat a key already seen.
    const seen = new Set<string>();
    for (let i = 0; i < 10; i++) {
      const q = generateForRound("power", "easy", "powers-special", seen);
      const key = questionKey(q);
      expect(seen.has(key)).toBe(false);
      seen.add(key);
    }
  });

  it("registers doubling and times-ninetynine under multiplication", () => {
    const ids = strategiesForOperation("multiplication").map((s) => s.id);
    expect(ids).toContain("doubling");
    expect(ids).toContain("times-ninetynine");
    expect(getStrategy("doubling").operation).toBe("multiplication");
    expect(getStrategy("times-ninetynine").operation).toBe("multiplication");
  });

  it("registers halving under division", () => {
    expect(strategiesForOperation("division").map((s) => s.id)).toContain(
      "halving",
    );
    expect(getStrategy("halving").operation).toBe("division");
  });

  it("registers the power and root strategies under their operations", () => {
    expect(strategiesForOperation("power").map((s) => s.id)).toEqual([
      "powers-basic",
      "powers-special",
    ]);
    expect(strategiesForOperation("root").map((s) => s.id)).toEqual([
      "root-exact",
      "root-approx",
    ]);
  });

  it("generateForRound dispatches to the power and root strategies", () => {
    const pow = generateForRound("power", "hard", "powers-special");
    expect(pow.operation).toBe("power");
    expect(pow.correctAnswer).toBe(pow.num1 ** pow.num2);

    const root = generateForRound("root", "medium", "root-exact");
    expect(root.operation).toBe("root");
    expect(root.correctAnswer ** root.num2).toBe(root.num1);

    const approx = generateForRound("root", "hard", "root-approx");
    expect(approx.correctAnswer ** approx.num2).toBeLessThanOrEqual(
      approx.num1,
    );
  });

  it("generateForRound dispatches to the new strategies", () => {
    const dbl = generateForRound("multiplication", "easy", "doubling");
    expect(dbl.num2).toBe(2);
    expect(dbl.correctAnswer).toBe(dbl.num1 * 2);

    const half = generateForRound("division", "easy", "halving");
    expect(half.num2).toBe(2);
    expect(half.correctAnswer).toBe(half.num1 / 2);

    const x99 = generateForRound("multiplication", "easy", "times-ninetynine");
    expect(x99.num2).toBe(99);
    expect(x99.correctAnswer).toBe(x99.num1 * 99);
  });
});
