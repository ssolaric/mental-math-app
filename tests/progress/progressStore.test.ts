import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { RoundSummary } from "../../src/hooks/useRound";
import {
  applyRoundToProgress,
  configureProgressStorage,
  createEmptyGameProgress,
  getProgress,
  recordRound,
  resetProgress,
  subscribeProgress,
} from "../../src/progress/progressStore";
import { inMemoryStorageAdapter } from "../../src/progress/storageAdapter";

const summary = (over: Partial<RoundSummary> = {}): RoundSummary => ({
  correct: 8,
  total: 10,
  bestStreak: 5,
  score: 180,
  elapsedMs: 20000,
  ...over,
});

describe("createEmptyGameProgress", () => {
  it("starts every counter and per-operation stat at zero", () => {
    const progress = createEmptyGameProgress();
    expect(progress.totalProblems).toBe(0);
    expect(progress.totalCorrect).toBe(0);
    expect(progress.allTimeStreak).toBe(0);
    for (const op of [
      "addition",
      "subtraction",
      "multiplication",
      "division",
    ] as const) {
      expect(progress.stats[op]).toEqual({
        totalAttempts: 0,
        correctAnswers: 0,
        bestScore: 0,
        bestStreak: 0,
        averageTime: 0,
        lastPlayed: 0,
      });
    }
  });
});

describe("applyRoundToProgress", () => {
  it("accumulates totals and per-operation attempts from a round", () => {
    const next = applyRoundToProgress(
      createEmptyGameProgress(),
      "addition",
      summary({ correct: 7, total: 10 }),
    );
    expect(next.totalProblems).toBe(10);
    expect(next.totalCorrect).toBe(7);
    expect(next.stats.addition.totalAttempts).toBe(10);
    expect(next.stats.addition.correctAnswers).toBe(7);
  });

  it("leaves other operations untouched", () => {
    const next = applyRoundToProgress(
      createEmptyGameProgress(),
      "addition",
      summary(),
    );
    expect(next.stats.subtraction.totalAttempts).toBe(0);
    expect(next.stats.multiplication.totalAttempts).toBe(0);
    expect(next.stats.division.totalAttempts).toBe(0);
  });

  it("does not mutate the input progress object", () => {
    const progress = createEmptyGameProgress();
    applyRoundToProgress(progress, "addition", summary());
    expect(progress.totalProblems).toBe(0);
    expect(progress.stats.addition.totalAttempts).toBe(0);
  });

  it("keeps the best score and best streak across rounds", () => {
    let progress = applyRoundToProgress(
      createEmptyGameProgress(),
      "division",
      summary({ score: 200, bestStreak: 6 }),
    );
    progress = applyRoundToProgress(
      progress,
      "division",
      summary({ score: 150, bestStreak: 4 }),
    );
    expect(progress.stats.division.bestScore).toBe(200);
    expect(progress.stats.division.bestStreak).toBe(6);
  });

  it("tracks the all-time streak as the max across all operations", () => {
    let progress = applyRoundToProgress(
      createEmptyGameProgress(),
      "addition",
      summary({ bestStreak: 4 }),
    );
    progress = applyRoundToProgress(
      progress,
      "subtraction",
      summary({ bestStreak: 9 }),
    );
    progress = applyRoundToProgress(
      progress,
      "addition",
      summary({ bestStreak: 2 }),
    );
    expect(progress.allTimeStreak).toBe(9);
  });

  it("records average time per problem in milliseconds for the first round", () => {
    const next = applyRoundToProgress(
      createEmptyGameProgress(),
      "addition",
      summary({ total: 10, elapsedMs: 30000 }),
    );
    // 30000ms over 10 problems -> 3000ms each
    expect(next.stats.addition.averageTime).toBe(3000);
  });

  it("blends average time weighted by attempt count across rounds", () => {
    // round 1: 10 problems averaging 2000ms
    let progress = applyRoundToProgress(
      createEmptyGameProgress(),
      "addition",
      summary({ total: 10, elapsedMs: 20000 }),
    );
    // round 2: 10 problems averaging 4000ms -> overall mean 3000ms
    progress = applyRoundToProgress(
      progress,
      "addition",
      summary({ total: 10, elapsedMs: 40000 }),
    );
    expect(progress.stats.addition.averageTime).toBe(3000);
  });

  it("treats an empty round as zero average time without dividing by zero", () => {
    const next = applyRoundToProgress(
      createEmptyGameProgress(),
      "addition",
      summary({ total: 0, correct: 0, elapsedMs: 0 }),
    );
    expect(next.stats.addition.averageTime).toBe(0);
    expect(next.stats.addition.totalAttempts).toBe(0);
  });

  it("stamps lastPlayed with the current time", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-12T00:00:00Z"));
    const next = applyRoundToProgress(
      createEmptyGameProgress(),
      "addition",
      summary(),
    );
    expect(next.stats.addition.lastPlayed).toBe(
      Date.parse("2026-06-12T00:00:00Z"),
    );
    vi.useRealTimers();
  });
});

describe("progress store", () => {
  beforeEach(() => {
    configureProgressStorage(inMemoryStorageAdapter());
  });

  afterEach(() => {
    configureProgressStorage(inMemoryStorageAdapter());
  });

  it("seeds the snapshot from persisted storage on configure", () => {
    const seeded = applyRoundToProgress(
      createEmptyGameProgress(),
      "addition",
      summary({ total: 10, correct: 9 }),
    );
    configureProgressStorage(inMemoryStorageAdapter(seeded));
    expect(getProgress().totalProblems).toBe(10);
    expect(getProgress().totalCorrect).toBe(9);
  });

  it("falls back to empty progress when storage is empty", () => {
    expect(getProgress()).toEqual(createEmptyGameProgress());
  });

  it("backfills operation stats missing from older persisted data", () => {
    // simulate data saved before the percentage operation existed
    const legacy = createEmptyGameProgress();
    // @ts-expect-error intentionally drop a key to mimic a pre-percentage payload
    delete legacy.stats.percentage;
    configureProgressStorage(inMemoryStorageAdapter(legacy));
    expect(getProgress().stats.percentage).toEqual({
      totalAttempts: 0,
      correctAnswers: 0,
      bestScore: 0,
      bestStreak: 0,
      averageTime: 0,
      lastPlayed: 0,
    });
    // a percentage round records cleanly rather than crashing on undefined stats
    recordRound("percentage", summary({ total: 10, correct: 7 }));
    expect(getProgress().stats.percentage.correctAnswers).toBe(7);
  });

  it("updates the snapshot and notifies subscribers when a round is recorded", () => {
    const listener = vi.fn();
    const unsubscribe = subscribeProgress(listener);

    recordRound("multiplication", summary({ total: 10, correct: 10 }));

    expect(listener).toHaveBeenCalledTimes(1);
    expect(getProgress().stats.multiplication.totalAttempts).toBe(10);
    unsubscribe();
  });

  it("persists recorded rounds across a re-read of the same storage", () => {
    const adapter = inMemoryStorageAdapter();
    configureProgressStorage(adapter);
    recordRound("addition", summary({ total: 10, correct: 6 }));
    // re-seeding from the same adapter should recover the persisted snapshot
    configureProgressStorage(adapter);
    expect(getProgress().stats.addition.correctAnswers).toBe(6);
  });

  it("stops notifying after unsubscribe", () => {
    const listener = vi.fn();
    const unsubscribe = subscribeProgress(listener);
    unsubscribe();
    recordRound("addition", summary());
    expect(listener).not.toHaveBeenCalled();
  });

  it("clears all progress and notifies subscribers on reset", () => {
    recordRound("addition", summary());
    const listener = vi.fn();
    subscribeProgress(listener);

    resetProgress();

    expect(listener).toHaveBeenCalledTimes(1);
    expect(getProgress()).toEqual(createEmptyGameProgress());
  });
});
