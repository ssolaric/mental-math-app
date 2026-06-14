import { Link } from "@tanstack/react-router";
import type { GameProgress, Operation } from "../types";

interface OperationSelectorProps {
  onSelectOperation: (operation: Operation) => void;
  gameProgress: GameProgress;
}

interface OperationMeta {
  type: Operation;
  symbol: string;
  label: string;
  textClass: string;
  hoverBgClass: string;
  hoverBorderClass: string;
}

const OPERATIONS: ReadonlyArray<OperationMeta> = [
  {
    type: "addition",
    symbol: "+",
    label: "Adición",
    textClass: "text-op-add",
    hoverBgClass: "hover:bg-op-add-tint",
    hoverBorderClass: "hover:border-op-add",
  },
  {
    type: "subtraction",
    symbol: "−",
    label: "Sustracción",
    textClass: "text-op-sub",
    hoverBgClass: "hover:bg-op-sub-tint",
    hoverBorderClass: "hover:border-op-sub",
  },
  {
    type: "multiplication",
    symbol: "×",
    label: "Multiplicación",
    textClass: "text-op-mul",
    hoverBgClass: "hover:bg-op-mul-tint",
    hoverBorderClass: "hover:border-op-mul",
  },
  {
    type: "division",
    symbol: "÷",
    label: "División",
    textClass: "text-op-div",
    hoverBgClass: "hover:bg-op-div-tint",
    hoverBorderClass: "hover:border-op-div",
  },
];

export const OperationSelector = ({
  onSelectOperation,
  gameProgress,
}: OperationSelectorProps) => {
  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <header className="px-6 md:px-12 py-6 flex items-center justify-between">
        <Link
          to="/"
          className="text-sm font-medium uppercase tracking-[0.18em] text-graphite-light hover:text-graphite-mid transition-colors"
        >
          ← Inicio
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-16">
        <div className="w-full max-w-3xl">
          <div className="mb-12 md:mb-16">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-graphite-light mb-3">
              Paso 1 de 2
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-graphite">
              ¿Qué quieres practicar?
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-5">
            {OPERATIONS.map((op) => {
              const stats = gameProgress.stats[op.type];
              const played = stats.totalAttempts > 0;
              const accuracy = played
                ? Math.round((stats.correctAnswers / stats.totalAttempts) * 100)
                : 0;

              return (
                <button
                  key={op.type}
                  type="button"
                  onClick={() => onSelectOperation(op.type)}
                  className={`group relative flex flex-col items-start gap-6 md:gap-8 p-6 md:p-8 bg-paper border border-paper-border rounded-lg transition-colors text-left ${op.hoverBgClass} ${op.hoverBorderClass} focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper`}
                >
                  <span
                    className={`flex h-16 md:h-20 items-center text-7xl md:text-8xl font-mono font-bold leading-none tabular-nums ${op.textClass}`}
                    aria-hidden="true"
                  >
                    {op.symbol}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xl md:text-2xl font-semibold text-graphite">
                      {op.label}
                    </span>
                    <span className="text-sm text-graphite-light min-h-5">
                      {played ? (
                        <>
                          <span className="font-mono tabular-nums">
                            {accuracy}%
                          </span>{" "}
                          precisión,{" "}
                          <span className="font-mono tabular-nums">
                            {stats.totalAttempts}
                          </span>{" "}
                          intentos
                        </>
                      ) : (
                        "Sin jugar aún"
                      )}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};
