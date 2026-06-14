import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { score } from "../scoring";
import { generateForRound, type StrategyId } from "../strategies";
import type { Difficulty, Operation, Question } from "../types";
import { validateAnswer } from "../utils/validators";

export type RoundStatus = "playing" | "wrong" | "finished";
export type DotResult = "correct" | "wrong";
export type StreakTier = 3 | 5 | 10;

const STREAK_TIERS: ReadonlyArray<StreakTier> = [3, 5, 10];
const DEFAULT_ROUND_LENGTH = 10;
const TICK_INTERVAL_MS = 100;

export interface LastSubmit {
  correct: boolean;
  pointsEarned: number;
  streakAfter: number;
  crossedTier: StreakTier | null;
  correctAnswer: number;
}

export interface RoundSummary {
  correct: number;
  total: number;
  bestStreak: number;
  score: number;
  elapsedMs: number;
}

export interface UseRoundReturn {
  status: RoundStatus;
  currentQuestion: Question | null;
  results: ReadonlyArray<DotResult>;
  score: number;
  streak: number;
  bestStreak: number;
  elapsedMs: number;
  lastSubmit: LastSubmit | null;
  summary: RoundSummary | null;
  submit: (answer: string) => void;
  advance: () => void;
  restart: () => void;
}

interface RoundState {
  status: RoundStatus;
  currentQuestion: Question | null;
  results: ReadonlyArray<DotResult>;
  score: number;
  streak: number;
  bestStreak: number;
  lastSubmit: LastSubmit | null;
  startTimeMs: number;
  frozenElapsedMs: number | null;
}

const freshState = (
  operation: Operation,
  difficulty: Difficulty,
  strategyId?: StrategyId,
): RoundState => ({
  status: "playing",
  currentQuestion: generateForRound(operation, difficulty, strategyId),
  results: [],
  score: 0,
  streak: 0,
  bestStreak: 0,
  lastSubmit: null,
  startTimeMs: Date.now(),
  frozenElapsedMs: null,
});

const tierCrossed = (prev: number, next: number): StreakTier | null => {
  // streak increments by 1 on correct, resets to 0 on wrong — at most one tier per submit
  for (let i = STREAK_TIERS.length - 1; i >= 0; i--) {
    const tier = STREAK_TIERS[i];
    if (prev < tier && next >= tier) return tier;
  }
  return null;
};

export const useRound = (
  operation: Operation,
  difficulty: Difficulty,
  length: number = DEFAULT_ROUND_LENGTH,
  strategyId?: StrategyId,
): UseRoundReturn => {
  const [state, setState] = useState<RoundState>(() =>
    freshState(operation, difficulty, strategyId),
  );
  const [, setTick] = useState(0);
  const lengthRef = useRef(length);
  lengthRef.current = length;

  // restart when operation/difficulty/strategy change
  useEffect(() => {
    setState(freshState(operation, difficulty, strategyId));
  }, [operation, difficulty, strategyId]);

  // live elapsed clock — ticks while playing or wrong, frozen on finished
  useEffect(() => {
    if (state.status === "finished") return;
    const id = window.setInterval(() => {
      setTick((t) => t + 1);
    }, TICK_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [state.status]);

  const submit = useCallback(
    (answer: string) => {
      setState((s) => {
        if (s.status !== "playing" || s.currentQuestion === null) return s;

        const isCorrect = validateAnswer(answer, s.currentQuestion);
        const newStreak = isCorrect ? s.streak + 1 : 0;
        const correctAnswer = s.currentQuestion.correctAnswer;
        const elapsedSecondsForQuestion = Math.floor(
          (Date.now() - s.startTimeMs) / 1000,
        );
        const pointsEarned = isCorrect
          ? score(
              s.currentQuestion.difficulty,
              newStreak,
              elapsedSecondsForQuestion,
            )
          : 0;

        const nextResults: ReadonlyArray<DotResult> = [
          ...s.results,
          isCorrect ? "correct" : "wrong",
        ];
        const roundOver = nextResults.length >= lengthRef.current;

        const lastSubmit: LastSubmit = {
          correct: isCorrect,
          pointsEarned,
          streakAfter: newStreak,
          crossedTier: isCorrect ? tierCrossed(s.streak, newStreak) : null,
          correctAnswer,
        };

        if (!isCorrect) {
          // wrong always pauses on the wrong screen, even on the Nth question
          return {
            ...s,
            status: "wrong",
            results: nextResults,
            streak: 0,
            lastSubmit,
          };
        }

        if (roundOver) {
          return {
            ...s,
            status: "finished",
            currentQuestion: null,
            results: nextResults,
            score: s.score + pointsEarned,
            streak: newStreak,
            bestStreak: Math.max(s.bestStreak, newStreak),
            lastSubmit,
            frozenElapsedMs: Date.now() - s.startTimeMs,
          };
        }

        return {
          ...s,
          currentQuestion: generateForRound(operation, difficulty, strategyId),
          results: nextResults,
          score: s.score + pointsEarned,
          streak: newStreak,
          bestStreak: Math.max(s.bestStreak, newStreak),
          lastSubmit,
        };
      });
    },
    [operation, difficulty, strategyId],
  );

  const advance = useCallback(() => {
    setState((s) => {
      if (s.status !== "wrong") return s;

      const roundOver = s.results.length >= lengthRef.current;
      if (roundOver) {
        return {
          ...s,
          status: "finished",
          currentQuestion: null,
          frozenElapsedMs: Date.now() - s.startTimeMs,
        };
      }
      return {
        ...s,
        status: "playing",
        currentQuestion: generateForRound(operation, difficulty, strategyId),
      };
    });
  }, [operation, difficulty, strategyId]);

  const restart = useCallback(() => {
    setState(freshState(operation, difficulty, strategyId));
  }, [operation, difficulty, strategyId]);

  const elapsedMs =
    state.frozenElapsedMs ?? Math.max(0, Date.now() - state.startTimeMs);

  const summary = useMemo<RoundSummary | null>(
    () =>
      state.status === "finished"
        ? {
            correct: state.results.filter((r) => r === "correct").length,
            total: state.results.length,
            bestStreak: state.bestStreak,
            score: state.score,
            elapsedMs: state.frozenElapsedMs ?? 0,
          }
        : null,
    [
      state.status,
      state.results,
      state.bestStreak,
      state.score,
      state.frozenElapsedMs,
    ],
  );

  return {
    status: state.status,
    currentQuestion: state.currentQuestion,
    results: state.results,
    score: state.score,
    streak: state.streak,
    bestStreak: state.bestStreak,
    elapsedMs,
    lastSubmit: state.lastSubmit,
    summary,
    submit,
    advance,
    restart,
  };
};
