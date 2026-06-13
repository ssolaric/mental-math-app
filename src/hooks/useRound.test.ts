import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Difficulty } from "../types";
import type { UseRoundReturn } from "./useRound";
import { useRound } from "./useRound";

// Fake timers keep the live elapsed clock (setInterval) and Date.now() based
// timing deterministic. Real timers would make scoring flaky.
beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

// Structural type so helpers accept renderHook results regardless of their
// initialProps shape (some tests parameterize difficulty, others don't).
type Round = { result: { current: UseRoundReturn } };

const answerCorrectly = (round: Round) => {
  act(() => {
    const q = round.result.current.currentQuestion;
    if (!q) throw new Error("no current question to answer");
    round.result.current.submit(String(q.correctAnswer));
  });
};

const answerWrongly = (round: Round) => {
  act(() => {
    const q = round.result.current.currentQuestion;
    if (!q) throw new Error("no current question to answer");
    round.result.current.submit(String(q.correctAnswer + 1));
  });
};

describe("useRound", () => {
  it("starts playing with a question and zeroed counters", () => {
    const { result } = renderHook(() => useRound("addition", "easy"));
    expect(result.current.status).toBe("playing");
    expect(result.current.currentQuestion).not.toBeNull();
    expect(result.current.score).toBe(0);
    expect(result.current.streak).toBe(0);
    expect(result.current.results).toEqual([]);
    expect(result.current.summary).toBeNull();
  });

  it("advances to a new question and grows the streak on a correct answer", () => {
    const round = renderHook(() => useRound("addition", "easy"));
    const firstQuestion = round.result.current.currentQuestion;

    answerCorrectly(round);

    expect(round.result.current.streak).toBe(1);
    expect(round.result.current.score).toBeGreaterThan(0);
    expect(round.result.current.results).toEqual(["correct"]);
    expect(round.result.current.lastSubmit?.correct).toBe(true);
    expect(round.result.current.currentQuestion).not.toBe(firstQuestion);
    expect(round.result.current.status).toBe("playing");
  });

  it("pauses on the wrong screen and resets the streak on a wrong answer", () => {
    const round = renderHook(() => useRound("addition", "easy"));
    const correctAnswer = round.result.current.currentQuestion?.correctAnswer;

    answerCorrectly(round); // streak -> 1
    answerWrongly(round); // streak -> 0, status wrong

    expect(round.result.current.status).toBe("wrong");
    expect(round.result.current.streak).toBe(0);
    expect(round.result.current.results).toEqual(["correct", "wrong"]);
    expect(round.result.current.lastSubmit?.correct).toBe(false);
    expect(typeof round.result.current.lastSubmit?.correctAnswer).toBe(
      "number",
    );
    // the revealed answer belongs to the question that was missed
    expect(correctAnswer).toBeDefined();
  });

  it("ignores submissions while paused on the wrong screen", () => {
    const round = renderHook(() => useRound("addition", "easy"));
    answerWrongly(round);
    expect(round.result.current.status).toBe("wrong");

    const resultsAfterWrong = round.result.current.results;
    answerCorrectly(round); // should be a no-op while status === "wrong"

    expect(round.result.current.status).toBe("wrong");
    expect(round.result.current.results).toEqual(resultsAfterWrong);
  });

  it("resumes play with a fresh question when advancing past the wrong screen", () => {
    const round = renderHook(() => useRound("addition", "easy"));
    answerWrongly(round);

    act(() => {
      round.result.current.advance();
    });

    expect(round.result.current.status).toBe("playing");
    expect(round.result.current.currentQuestion).not.toBeNull();
  });

  it("flags the streak tier the moment it is crossed", () => {
    const round = renderHook(() => useRound("addition", "easy", 20));

    answerCorrectly(round);
    answerCorrectly(round);
    expect(round.result.current.lastSubmit?.crossedTier).toBeNull();

    answerCorrectly(round); // streak hits 3
    expect(round.result.current.lastSubmit?.crossedTier).toBe(3);

    answerCorrectly(round); // streak 4, no new tier
    expect(round.result.current.lastSubmit?.crossedTier).toBeNull();
  });

  it("finishes the round after the configured number of questions", () => {
    const round = renderHook(() => useRound("addition", "easy", 3));

    answerCorrectly(round);
    answerCorrectly(round);
    expect(round.result.current.summary).toBeNull();
    answerCorrectly(round);

    expect(round.result.current.status).toBe("finished");
    expect(round.result.current.currentQuestion).toBeNull();
    expect(round.result.current.summary).toMatchObject({
      correct: 3,
      total: 3,
      bestStreak: 3,
    });
    expect(round.result.current.summary?.score).toBeGreaterThan(0);
  });

  it("finishes after advancing past a wrong answer on the final question", () => {
    const round = renderHook(() => useRound("addition", "easy", 2));

    answerCorrectly(round);
    answerWrongly(round); // 2nd and final answer is wrong -> paused on wrong
    expect(round.result.current.status).toBe("wrong");

    act(() => {
      round.result.current.advance();
    });

    expect(round.result.current.status).toBe("finished");
    expect(round.result.current.summary).toMatchObject({
      correct: 1,
      total: 2,
    });
  });

  it("reports the best streak reached even after it is broken", () => {
    const round = renderHook(() => useRound("addition", "easy", 5));

    answerCorrectly(round);
    answerCorrectly(round);
    answerCorrectly(round); // streak 3
    answerWrongly(round); // streak -> 0
    act(() => round.result.current.advance());
    answerCorrectly(round); // round of 5 complete

    expect(round.result.current.status).toBe("finished");
    expect(round.result.current.summary?.bestStreak).toBe(3);
    expect(round.result.current.summary?.correct).toBe(4);
  });

  it("restarts to a clean playing state", () => {
    const round = renderHook(() => useRound("addition", "easy", 2));
    answerCorrectly(round);
    answerCorrectly(round);
    expect(round.result.current.status).toBe("finished");

    act(() => {
      round.result.current.restart();
    });

    expect(round.result.current.status).toBe("playing");
    expect(round.result.current.score).toBe(0);
    expect(round.result.current.results).toEqual([]);
    expect(round.result.current.summary).toBeNull();
    expect(round.result.current.currentQuestion).not.toBeNull();
  });

  it("freezes elapsed time once the round is finished", () => {
    const round = renderHook(() => useRound("addition", "easy", 1));
    answerCorrectly(round); // single-question round finishes immediately
    expect(round.result.current.status).toBe("finished");

    const frozen = round.result.current.elapsedMs;
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(round.result.current.elapsedMs).toBe(frozen);
  });

  it("starts a brand new round when the difficulty changes", () => {
    const round = renderHook(
      ({ difficulty }: { difficulty: Difficulty }) =>
        useRound("addition", difficulty, 5),
      { initialProps: { difficulty: "easy" as Difficulty } },
    );
    answerCorrectly(round);
    expect(round.result.current.results).toEqual(["correct"]);

    act(() => {
      round.rerender({ difficulty: "hard" });
    });

    expect(round.result.current.status).toBe("playing");
    expect(round.result.current.results).toEqual([]);
    expect(round.result.current.score).toBe(0);
    expect(round.result.current.currentQuestion?.difficulty).toBe("hard");
  });
});
