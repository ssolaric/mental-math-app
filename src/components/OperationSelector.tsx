import { Plus, Minus, X, Divide } from 'lucide-react';
import type { Operation, GameProgress } from '../types';
import { OPERATION_LABELS } from '../constants/gameConfig';

interface OperationSelectorProps {
  onSelectOperation: (operation: Operation) => void;
  gameProgress: GameProgress;
}

export const OperationSelector = ({ onSelectOperation, gameProgress }: OperationSelectorProps) => {
  const operations: Array<{ type: Operation; icon: React.ReactNode; color: string }> = [
    { type: 'addition', icon: <Plus size={48} />, color: 'bg-green-500 hover:bg-green-600' },
    { type: 'subtraction', icon: <Minus size={48} />, color: 'bg-blue-500 hover:bg-blue-600' },
    { type: 'multiplication', icon: <X size={48} />, color: 'bg-purple-500 hover:bg-purple-600' },
    { type: 'division', icon: <Divide size={48} />, color: 'bg-orange-500 hover:bg-orange-600' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-8">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Mental Math Practice</h1>
      <p className="text-xl text-gray-600 mb-12">Choose an operation to practice</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        {operations.map(({ type, icon, color }) => {
          const stats = gameProgress.stats[type];
          const accuracy = stats.totalAttempts > 0
            ? Math.round((stats.correctAnswers / stats.totalAttempts) * 100)
            : 0;

          return (
            <button
              key={type}
              onClick={() => onSelectOperation(type)}
              className={`${color} text-white p-8 rounded-2xl shadow-lg transition-transform transform hover:scale-105 active:scale-95`}
            >
              <div className="flex flex-col items-center">
                {icon}
                <h2 className="text-2xl font-bold mt-4">{OPERATION_LABELS[type]}</h2>
                {stats.totalAttempts > 0 && (
                  <div className="mt-4 text-sm opacity-90">
                    <p>{stats.correctAnswers}/{stats.totalAttempts} correct ({accuracy}%)</p>
                    <p>Best score: {stats.bestScore}</p>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
