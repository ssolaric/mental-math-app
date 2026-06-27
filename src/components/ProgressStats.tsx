import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
  percentage: "Porcentaje",
};

const OPERATION_ORDER: ReadonlyArray<Operation> = [
  "addition",
  "subtraction",
  "multiplication",
  "division",
  "percentage",
];

export const ProgressStats = ({
  gameProgress,
  onResetProgress,
}: ProgressStatsProps) => {
  const [resetArmed, setResetArmed] = useState(false);

  useEffect(() => {
    if (!resetArmed) return;
    const t = window.setTimeout(() => setResetArmed(false), 4000);
    return () => window.clearTimeout(t);
  }, [resetArmed]);

  const overallAccuracy =
    gameProgress.totalProblems > 0
      ? Math.round(
          (gameProgress.totalCorrect / gameProgress.totalProblems) * 100,
        )
      : 0;

  const handleResetClick = () => {
    if (resetArmed) {
      onResetProgress();
      setResetArmed(false);
    } else {
      setResetArmed(true);
    }
  };

  const hasData = gameProgress.totalProblems > 0;

  return (
    <div className="min-h-dvh bg-paper flex flex-col">
      <header className="px-6 md:px-12 py-6">
        <Link
          to="/"
          className="text-sm font-medium uppercase tracking-[0.18em] text-graphite-light hover:text-graphite-mid transition-colors"
        >
          ← Inicio
        </Link>
      </header>

      <main className="flex-1 px-6 md:px-12 pb-16">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-baseline justify-between gap-6 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-graphite">
              Tu progreso
            </h1>
            {hasData && (
              <button
                type="button"
                onClick={handleResetClick}
                className={`py-1.5 -my-1.5 text-sm font-medium underline underline-offset-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-graphite focus-visible:ring-offset-2 focus-visible:ring-offset-paper rounded-sm ${
                  resetArmed
                    ? "text-wrong-dim decoration-wrong-dim"
                    : "text-graphite-light hover:text-graphite-mid decoration-paper-border hover:decoration-graphite-mid"
                }`}
              >
                {resetArmed ? "Tocar otra vez para borrar todo" : "Reiniciar"}
              </button>
            )}
          </div>

          {hasData ? (
            <>
              <section className="mb-14">
                <h2 className="text-sm font-medium uppercase tracking-[0.22em] text-graphite-light mb-4">
                  En total
                </h2>
                <p className="text-2xl md:text-3xl text-graphite leading-relaxed">
                  <span className="font-mono font-bold tabular-nums">
                    {gameProgress.totalProblems}
                  </span>{" "}
                  <span className="text-graphite-mid">problemas</span>,{" "}
                  <span className="font-mono font-bold tabular-nums">
                    {overallAccuracy}%
                  </span>{" "}
                  <span className="text-graphite-mid">de precisión</span>, mejor
                  racha de{" "}
                  <span className="font-mono font-bold tabular-nums">
                    {gameProgress.allTimeStreak}
                  </span>
                  .
                </p>
              </section>

              <section>
                <h2 className="text-sm font-medium uppercase tracking-[0.22em] text-graphite-light mb-4">
                  Por operación
                </h2>
                <ul className="divide-y divide-paper-border">
                  {OPERATION_ORDER.map((op) => {
                    const stats = gameProgress.stats[op];
                    const played = stats.totalAttempts > 0;
                    const accuracy = played
                      ? Math.round(
                          (stats.correctAnswers / stats.totalAttempts) * 100,
                        )
                      : 0;

                    return (
                      <li
                        key={op}
                        className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 py-5"
                      >
                        <span className="text-xl font-semibold text-graphite">
                          {OPERATION_LABELS[op]}
                        </span>
                        {played ? (
                          <span className="text-base text-graphite-mid">
                            <span className="font-mono tabular-nums">
                              {stats.totalAttempts}
                            </span>{" "}
                            intentos ·{" "}
                            <span className="text-graphite font-mono font-medium tabular-nums">
                              {accuracy}%
                            </span>{" "}
                            · mejor puntuación{" "}
                            <span className="text-graphite font-mono font-medium tabular-nums">
                              {stats.bestScore}
                            </span>{" "}
                            · racha{" "}
                            <span className="text-graphite font-mono font-medium tabular-nums">
                              {stats.bestStreak}
                            </span>
                          </span>
                        ) : (
                          <span className="text-base text-graphite-light italic">
                            Sin jugar aún
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </section>
            </>
          ) : (
            <div className="flex flex-col items-start gap-6 py-8">
              <p className="text-xl text-graphite-mid max-w-md leading-relaxed">
                Aquí verás tu progreso cuando juegues tu primera ronda.
              </p>
              <Link
                to="/operation-select"
                className="px-6 py-3 bg-accent hover:bg-accent-hover text-graphite font-bold tracking-wide rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                Empezar a practicar
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
