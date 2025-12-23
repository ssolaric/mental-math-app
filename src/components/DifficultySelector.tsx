import type { Difficulty, Operation } from "../types";

interface DifficultySelectorProps {
  operation: Operation;
  onSelectDifficulty: (difficulty: Difficulty) => void;
}

const OPERATION_LABELS: Record<Operation, string> = {
  addition: "Adición",
  subtraction: "Sustracción",
  multiplication: "Multiplicación",
  division: "División",
};

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: "Fácil",
  medium: "Medio",
  hard: "Difícil",
};

const DIFFICULTY_DESCRIPTIONS: Record<Operation, Record<Difficulty, string>> = {
  addition: {
    easy: "1-9 + 1-9",
    medium: "10-99 + 10-99",
    hard: "100-999 + 10-99",
  },
  subtraction: {
    easy: "5-9 − 1-5",
    medium: "20-99 − 1-50",
    hard: "100-999 − 10-99",
  },
  multiplication: {
    easy: "1-9 × 1-9",
    medium: "1-9 × 10-20",
    hard: "10-25 × 2-9",
  },
  division: {
    easy: "Datos básicos",
    medium: "20-90 ÷ 2-9",
    hard: "10-99 ÷ 2-9",
  },
};

export const DifficultySelector = ({
  operation,
  onSelectDifficulty,
}: DifficultySelectorProps) => {
  const difficulties: Array<{ level: Difficulty; color: string }> = [
    { level: "easy", color: "bg-emerald-500 hover:bg-emerald-600" },
    { level: "medium", color: "bg-amber-500 hover:bg-amber-600" },
    { level: "hard", color: "bg-red-500 hover:bg-red-600" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-green-100 to-emerald-100 p-8">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        {OPERATION_LABELS[operation]}
      </h1>
      <p className="text-xl text-gray-600 mb-12">
        Elige tu nivel de dificultad
      </p>

      <div className="flex flex-col gap-6 w-full max-w-md">
        {difficulties.map(({ level, color }) => (
          <button
            key={level}
            type="button"
            onClick={() => onSelectDifficulty(level)}
            className={`${color} text-white p-8 rounded-2xl shadow-lg transition-transform transform hover:scale-105 active:scale-95`}
          >
            <div className="flex flex-col items-center">
              <h2 className="text-3xl font-bold">{DIFFICULTY_LABELS[level]}</h2>
              <p className="mt-2 text-lg opacity-90">
                {DIFFICULTY_DESCRIPTIONS[operation][level]}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
