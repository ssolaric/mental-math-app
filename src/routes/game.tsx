import { useState, useEffect } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import type { Operation, Difficulty } from '../types';
import { STORAGE_KEYS } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useGameState } from '../hooks/useGameState';
import { useTimer } from '../hooks/useTimer';
import { createEmptyGameProgress, updateGameProgress } from '../utils/storage';
import { Question } from '../components/Question';
import { AnswerInput } from '../components/AnswerInput';
import { Feedback } from '../components/Feedback';
import { ScoreBoard } from '../components/ScoreBoard';
import { StreakIndicator } from '../components/StreakIndicator';
import { Timer } from '../components/Timer';
import { useTranslation } from '../i18n/TranslationContext';

type GameSearch = {
  operation: Operation;
  difficulty: Difficulty;
};

export const Route = createFileRoute('/game')({
  validateSearch: (search: Record<string, unknown>): GameSearch => {
    return {
      operation: search.operation as Operation,
      difficulty: search.difficulty as Difficulty,
    };
  },
  component: GamePage,
});

function GamePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { operation, difficulty } = Route.useSearch();
  const [showFeedback, setShowFeedback] = useState(false);

  const [gameProgress, setGameProgress] = useLocalStorage(
    STORAGE_KEYS.GAME_PROGRESS,
    createEmptyGameProgress()
  );

  const {
    currentQuestion,
    sessionData,
    lastAnswerCorrect,
    startSession,
    submitAnswer,
    nextQuestion,
    endSession,
  } = useGameState();

  const { elapsedTime, start: startTimer, pause: pauseTimer, reset: resetTimer } = useTimer();

  // Start the game session when component mounts
  useEffect(() => {
    startSession(operation, difficulty);
    startTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  const handleAnswerSubmit = (answer: string) => {
    if (!currentQuestion || !sessionData) return;

    const timeInSeconds = Math.floor(elapsedTime / 1000);
    submitAnswer(answer, timeInSeconds);
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      nextQuestion();
    }, 1000);
  };

  const handleQuitSession = () => {
    const finalSession = endSession();
    pauseTimer();

    if (finalSession) {
      const avgTime =
        finalSession.questionsAnswered > 0
          ? (Date.now() - finalSession.startTime) / finalSession.questionsAnswered
          : 0;

      const updatedProgress = updateGameProgress(
        gameProgress,
        operation,
        finalSession.correctAnswers,
        finalSession.questionsAnswered,
        finalSession.score,
        finalSession.bestStreak,
        avgTime
      );

      setGameProgress(updatedProgress);
    }

    resetTimer();
    navigate({ to: '/' });
  };

  if (!currentQuestion || !sessionData) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-linear-to-br from-green-50 to-emerald-100 p-8">
      <div className="flex justify-between items-start mb-8">
        <button
          onClick={handleQuitSession}
          className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-xl transition-colors"
        >
          {t('common.quit')}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8 justify-center">
        <ScoreBoard sessionData={sessionData} />
        <Timer elapsedTime={elapsedTime} />
        <StreakIndicator
          currentStreak={sessionData.currentStreak}
          bestStreak={sessionData.bestStreak}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <Question question={currentQuestion} questionNumber={sessionData.questionsAnswered + 1} />

        {showFeedback && lastAnswerCorrect !== null ? (
          <div className="mt-8">
            <Feedback
              isCorrect={lastAnswerCorrect}
              correctAnswer={!lastAnswerCorrect ? currentQuestion.correctAnswer : undefined}
            />
          </div>
        ) : (
          <div className="mt-8">
            <AnswerInput onSubmit={handleAnswerSubmit} disabled={showFeedback} />
          </div>
        )}
      </div>
    </div>
  );
}
