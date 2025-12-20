import { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import type { Operation, Difficulty, Screen } from './types';
import { STORAGE_KEYS } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useGameState } from './hooks/useGameState';
import { useTimer } from './hooks/useTimer';
import { createEmptyGameProgress, updateGameProgress } from './utils/storage';
import { OperationSelector } from './components/OperationSelector';
import { DifficultySelector } from './components/DifficultySelector';
import { Question } from './components/Question';
import { AnswerInput } from './components/AnswerInput';
import { Feedback } from './components/Feedback';
import { ScoreBoard } from './components/ScoreBoard';
import { StreakIndicator } from './components/StreakIndicator';
import { Timer } from './components/Timer';
import { ProgressStats } from './components/ProgressStats';

function App() {
  const [screen, setScreen] = useState<Screen>('landing');
  const [selectedOperation, setSelectedOperation] = useState<Operation | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
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

  const handleOperationSelect = (operation: Operation) => {
    setSelectedOperation(operation);
    setScreen('difficulty-select');
  };

  const handleDifficultySelect = (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
    if (selectedOperation) {
      startSession(selectedOperation, difficulty);
      startTimer();
      setScreen('game');
    }
  };

  const handleAnswerSubmit = (answer: string) => {
    if (!currentQuestion || !sessionData) return;

    const timeInSeconds = Math.floor(elapsedTime / 1000);
    submitAnswer(answer, timeInSeconds);
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      nextQuestion();
    }, 1500);
  };

  const handleQuitSession = () => {
    const finalSession = endSession();
    pauseTimer();

    if (finalSession && selectedOperation) {
      const avgTime = finalSession.questionsAnswered > 0
        ? (Date.now() - finalSession.startTime) / finalSession.questionsAnswered
        : 0;

      const updatedProgress = updateGameProgress(
        gameProgress,
        selectedOperation,
        finalSession.correctAnswers,
        finalSession.questionsAnswered,
        finalSession.score,
        finalSession.bestStreak,
        avgTime
      );

      setGameProgress(updatedProgress);
    }

    resetTimer();
    setSelectedOperation(null);
    setSelectedDifficulty(null);
    setScreen('landing');
  };

  const handleBackFromDifficulty = () => {
    setScreen('operation-select');
    setSelectedDifficulty(null);
  };

  const handleBackFromStats = () => {
    setScreen('landing');
  };

  const handleStartPractice = () => {
    setScreen('operation-select');
  };

  const handleViewStats = () => {
    setScreen('stats');
  };

  return (
    <div className="min-h-screen">
      {screen === 'landing' && (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8 text-center">
            Mental Math Practice
          </h1>
          <p className="text-2xl text-gray-600 mb-12 text-center">
            Practice your math skills and track your progress!
          </p>
          <div className="flex flex-col gap-4 w-full max-w-md">
            <button
              onClick={handleStartPractice}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-2xl py-6 rounded-2xl shadow-lg transition-transform transform hover:scale-105 active:scale-95"
            >
              Start Practice
            </button>
            <button
              onClick={handleViewStats}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-2xl py-6 rounded-2xl shadow-lg transition-transform transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
            >
              <BarChart3 size={32} />
              View Progress
            </button>
          </div>
        </div>
      )}

      {screen === 'operation-select' && (
        <OperationSelector onSelectOperation={handleOperationSelect} gameProgress={gameProgress} />
      )}

      {screen === 'difficulty-select' && selectedOperation && (
        <DifficultySelector
          operation={selectedOperation}
          onSelectDifficulty={handleDifficultySelect}
          onBack={handleBackFromDifficulty}
        />
      )}

      {screen === 'game' && currentQuestion && sessionData && (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-8">
          <div className="flex justify-between items-start mb-8">
            <button
              onClick={handleQuitSession}
              className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              Quit
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
      )}

      {screen === 'stats' && <ProgressStats gameProgress={gameProgress} onBack={handleBackFromStats} />}
    </div>
  );
}

export default App;
