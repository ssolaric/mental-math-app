import { ArrowLeft } from 'lucide-react';
import type { Operation, Difficulty } from '../types';
import { OPERATION_LABELS, DIFFICULTY_LABELS, DIFFICULTY_DESCRIPTIONS } from '../constants/gameConfig';

interface DifficultySelectorProps {
  operation: Operation;
  onSelectDifficulty: (difficulty: Difficulty) => void;
  onBack: () => void;
}

export const DifficultySelector = ({ operation, onSelectDifficulty, onBack }: DifficultySelectorProps) => {
  const difficulties: Array<{ level: Difficulty; color: string }> = [
    { level: 'easy', color: 'bg-emerald-500 hover:bg-emerald-600' },
    { level: 'medium', color: 'bg-amber-500 hover:bg-amber-600' },
    { level: 'hard', color: 'bg-red-500 hover:bg-red-600' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-8">
      <button
        onClick={onBack}
        className="absolute top-8 left-8 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft size={24} />
        <span className="text-lg">Back</span>
      </button>

      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{OPERATION_LABELS[operation]}</h1>
      <p className="text-xl text-gray-600 mb-12">Choose your difficulty level</p>

      <div className="flex flex-col gap-6 w-full max-w-md">
        {difficulties.map(({ level, color }) => (
          <button
            key={level}
            onClick={() => onSelectDifficulty(level)}
            className={`${color} text-white p-8 rounded-2xl shadow-lg transition-transform transform hover:scale-105 active:scale-95`}
          >
            <div className="flex flex-col items-center">
              <h2 className="text-3xl font-bold">{DIFFICULTY_LABELS[level]}</h2>
              <p className="mt-2 text-lg opacity-90">{DIFFICULTY_DESCRIPTIONS[operation][level]}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
