import { useTranslation } from "../i18n/TranslationContext";
import type { Difficulty, Operation } from "../types";

interface DifficultySelectorProps {
  operation: Operation;
  onSelectDifficulty: (difficulty: Difficulty) => void;
}

export const DifficultySelector = ({
  operation,
  onSelectDifficulty,
}: DifficultySelectorProps) => {
  const { t } = useTranslation();

  const difficulties: Array<{ level: Difficulty; color: string }> = [
    { level: "easy", color: "bg-emerald-500 hover:bg-emerald-600" },
    { level: "medium", color: "bg-amber-500 hover:bg-amber-600" },
    { level: "hard", color: "bg-red-500 hover:bg-red-600" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-emerald-100 p-8">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        {t(`operations.${operation}`)}
      </h1>
      <p className="text-xl text-gray-600 mb-12">
        {t("difficulty.chooseLevel")}
      </p>

      <div className="flex flex-col gap-6 w-full max-w-md">
        {difficulties.map(({ level, color }) => (
          <button
            key={level}
            onClick={() => onSelectDifficulty(level)}
            className={`${color} text-white p-8 rounded-2xl shadow-lg transition-transform transform hover:scale-105 active:scale-95`}
          >
            <div className="flex flex-col items-center">
              <h2 className="text-3xl font-bold">{t(`difficulty.${level}`)}</h2>
              <p className="mt-2 text-lg opacity-90">
                {t(`difficulty.descriptions.${operation}.${level}`)}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
