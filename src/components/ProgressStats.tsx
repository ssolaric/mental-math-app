import { ArrowLeft, Trophy, Target, Flame } from 'lucide-react';
import type { GameProgress } from '../types';
import { OPERATION_LABELS } from '../constants/gameConfig';

interface ProgressStatsProps {
  gameProgress: GameProgress;
  onBack: () => void;
}

export const ProgressStats = ({ gameProgress, onBack }: ProgressStatsProps) => {
  const overallAccuracy =
    gameProgress.totalProblems > 0
      ? Math.round((gameProgress.totalCorrect / gameProgress.totalProblems) * 100)
      : 0;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors mb-8"
      >
        <ArrowLeft size={24} />
        <span className="text-lg">Back to Home</span>
      </button>

      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center">Your Progress</h1>

      <div className="max-w-4xl mx-auto w-full space-y-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Overall Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <Target className="text-blue-600" size={40} />
              <div>
                <p className="text-gray-600 text-sm">Total Problems</p>
                <p className="text-3xl font-bold text-gray-800">{gameProgress.totalProblems}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Trophy className="text-yellow-600" size={40} />
              <div>
                <p className="text-gray-600 text-sm">Accuracy</p>
                <p className="text-3xl font-bold text-gray-800">{overallAccuracy}%</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Flame className="text-red-600" size={40} />
              <div>
                <p className="text-gray-600 text-sm">Best Streak</p>
                <p className="text-3xl font-bold text-gray-800">{gameProgress.allTimeStreak}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">By Operation</h2>
          <div className="space-y-6">
            {(Object.keys(gameProgress.stats) as Array<keyof typeof gameProgress.stats>).map((operation) => {
              const stats = gameProgress.stats[operation];
              const accuracy =
                stats.totalAttempts > 0
                  ? Math.round((stats.correctAnswers / stats.totalAttempts) * 100)
                  : 0;

              return (
                <div key={operation} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{OPERATION_LABELS[operation]}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-gray-600 text-sm">Attempts</p>
                      <p className="text-2xl font-bold text-gray-800">{stats.totalAttempts}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Accuracy</p>
                      <p className="text-2xl font-bold text-green-600">{accuracy}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Best Score</p>
                      <p className="text-2xl font-bold text-blue-600">{stats.bestScore}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Best Streak</p>
                      <p className="text-2xl font-bold text-orange-600">{stats.bestStreak}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
