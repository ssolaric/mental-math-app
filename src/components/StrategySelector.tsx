import { Link } from "@tanstack/react-router";
import type { Strategy } from "../strategies";
import type { Operation } from "../types";

interface StrategySelectorProps {
  operation: Operation;
  strategies: Strategy[];
  onSelectStandard: () => void;
  onSelectStrategy: (strategy: Strategy) => void;
}

const OPERATION_LABELS: Record<Operation, string> = {
  addition: "Adición",
  subtraction: "Sustracción",
  multiplication: "Multiplicación",
  division: "División",
};

export const StrategySelector = ({
  operation,
  strategies,
  onSelectStandard,
  onSelectStrategy,
}: StrategySelectorProps) => {
  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <header className="px-6 md:px-12 py-6">
        <Link
          to="/operation-select"
          className="text-sm font-medium uppercase tracking-[0.18em] text-graphite-light hover:text-graphite-mid transition-colors"
        >
          ← {OPERATION_LABELS[operation]}
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
        <div className="w-full max-w-md">
          <div className="mb-6">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-graphite-light mb-3">
              Modo de práctica
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-graphite">
              Elige una técnica.
            </h1>
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={onSelectStandard}
              className="group flex flex-col gap-1 p-4 md:p-5 bg-paper border border-paper-border hover:border-graphite-light rounded-lg transition-all text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-graphite focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              <span className="text-xl md:text-2xl font-bold text-graphite">
                Estándar
              </span>
              <span className="text-sm md:text-base font-medium text-graphite-mid">
                Práctica general
              </span>
            </button>

            {strategies.map((strategy) => (
              <button
                key={strategy.id}
                type="button"
                onClick={() => onSelectStrategy(strategy)}
                className="group flex flex-col gap-1 p-4 md:p-5 bg-paper border border-paper-border hover:border-graphite-light rounded-lg transition-all text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-graphite focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                <span className="text-xl md:text-2xl font-bold text-graphite">
                  {strategy.label}
                </span>
                <span className="font-mono text-sm md:text-base font-medium text-graphite-mid tabular-nums">
                  {strategy.example}
                </span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
