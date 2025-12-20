import { useState, useCallback } from 'react';
import type { Operation, Difficulty, Question, SessionData } from '../types';
import { generateQuestion } from '../utils/mathGenerator';
import { validateAnswer } from '../utils/validators';
import { calculatePoints } from '../constants/gameConfig';

export interface UseGameStateReturn {
  currentQuestion: Question | null;
  sessionData: SessionData | null;
  lastAnswerCorrect: boolean | null;
  startSession: (operation: Operation, difficulty: Difficulty) => void;
  submitAnswer: (answer: string, timeInSeconds: number) => boolean;
  nextQuestion: () => void;
  endSession: () => SessionData | null;
}

export const useGameState = (): UseGameStateReturn => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);

  const startSession = useCallback((operation: Operation, difficulty: Difficulty) => {
    const firstQuestion = generateQuestion(operation, difficulty);

    setCurrentQuestion(firstQuestion);
    setSessionData({
      operation,
      difficulty,
      questionsAnswered: 0,
      correctAnswers: 0,
      currentStreak: 0,
      bestStreak: 0,
      score: 0,
      startTime: Date.now(),
      lastQuestionTime: Date.now(),
    });
    setLastAnswerCorrect(null);
  }, []);

  const submitAnswer = useCallback(
    (answer: string, timeInSeconds: number): boolean => {
      if (!currentQuestion || !sessionData) return false;

      const isCorrect = validateAnswer(answer, currentQuestion);
      setLastAnswerCorrect(isCorrect);

      const newStreak = isCorrect ? sessionData.currentStreak + 1 : 0;
      const pointsEarned = isCorrect
        ? calculatePoints(sessionData.difficulty, newStreak, timeInSeconds)
        : 0;

      setSessionData({
        ...sessionData,
        questionsAnswered: sessionData.questionsAnswered + 1,
        correctAnswers: sessionData.correctAnswers + (isCorrect ? 1 : 0),
        currentStreak: newStreak,
        bestStreak: Math.max(sessionData.bestStreak, newStreak),
        score: sessionData.score + pointsEarned,
        lastQuestionTime: Date.now(),
      });

      return isCorrect;
    },
    [currentQuestion, sessionData]
  );

  const nextQuestion = useCallback(() => {
    if (!sessionData) return;

    const newQuestion = generateQuestion(sessionData.operation, sessionData.difficulty);
    setCurrentQuestion(newQuestion);
    setLastAnswerCorrect(null);
  }, [sessionData]);

  const endSession = useCallback((): SessionData | null => {
    const finalSessionData = sessionData;
    setCurrentQuestion(null);
    setSessionData(null);
    setLastAnswerCorrect(null);
    return finalSessionData;
  }, [sessionData]);

  return {
    currentQuestion,
    sessionData,
    lastAnswerCorrect,
    startSession,
    submitAnswer,
    nextQuestion,
    endSession,
  };
};
