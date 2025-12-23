import { Flame, Target, Trash2, Trophy } from "lucide-react";
import type { GameProgress, Operation } from "../types";

interface ProgressStatsProps {
  gameProgress: GameProgress;
  onResetProgress: () => void;
}

const OPERATION_LABELS: Record<Operation, string> = {
  addition: "Adición",
  subtraction: "Sustracción",
  multiplication: "Multiplicación",
  division: "División",
};

export const ProgressStats = ({
  gameProgress,
  onResetProgress,
}: ProgressStatsProps) => {
  const overallAccuracy =
    gameProgress.totalProblems > 0
      ? Math.round(
          (gameProgress.totalCorrect / gameProgress.totalProblems) * 100,
        )
      : 0;

  const handleResetClick = () => {
    if (
      window.confirm(
        "¿Estás seguro de que quieres reiniciar TODO tu progreso? ¡Esto no se puede deshacer!",
      )
    ) {
      onResetProgress();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-linear-to-br from-green-100 to-emerald-100 p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center md:text-left">
          Tu progreso
        </h1>
        <button
          type="button"
          onClick={handleResetClick}
          className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-xl transition-colors flex items-center gap-2"
        >
          <Trash2 size={20} />
          Reiniciar todo el progreso
        </button>
      </div>

      <div className="max-w-4xl mx-auto w-full space-y-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Estadísticas generales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <Target className="text-blue-600" size={40} />
              <div>
                <p className="text-gray-600 text-sm">Problemas totales</p>
                <p className="text-3xl font-bold text-gray-800">
                  {gameProgress.totalProblems}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Trophy className="text-yellow-600" size={40} />
              <div>
                <p className="text-gray-600 text-sm">Precisión</p>
                <p className="text-3xl font-bold text-gray-800">
                  {overallAccuracy}%
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Flame className="text-red-600" size={40} />
              <div>
                <p className="text-gray-600 text-sm">Mejor racha</p>
                <p className="text-3xl font-bold text-gray-800">
                  {gameProgress.allTimeStreak}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Por operación
          </h2>
          <div className="space-y-6">
            {(
              Object.keys(gameProgress.stats) as Array<
                keyof typeof gameProgress.stats
              >
            ).map((operation) => {
              const stats = gameProgress.stats[operation];
              const accuracy =
                stats.totalAttempts > 0
                  ? Math.round(
                      (stats.correctAnswers / stats.totalAttempts) * 100,
                    )
                  : 0;

              return (
                <div
                  key={operation}
                  className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {OPERATION_LABELS[operation]}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-gray-600 text-sm">Intentos</p>
                      <p className="text-2xl font-bold text-gray-800">
                        {stats.totalAttempts}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Precisión</p>
                      <p className="text-2xl font-bold text-green-600">
                        {accuracy}%
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Mejor puntuación</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {stats.bestScore}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Mejor racha</p>
                      <p className="text-2xl font-bold text-orange-600">
                        {stats.bestStreak}
                      </p>
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
