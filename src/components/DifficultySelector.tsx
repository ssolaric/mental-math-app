import { Link } from "@tanstack/react-router";
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

const DIFFICULTY_RANGES: Record<Operation, Record<Difficulty, string>> = {
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

interface DifficultyMeta {
  level: Difficulty;
  bgClass: string;
  hoverBgClass: string;
}

const DIFFICULTIES: ReadonlyArray<DifficultyMeta> = [
  {
    level: "easy",
    bgClass: "bg-diff-easy",
    hoverBgClass: "hover:brightness-95",
  },
  {
    level: "medium",
    bgClass: "bg-diff-medium",
    hoverBgClass: "hover:brightness-95",
  },
  {
    level: "hard",
    bgClass: "bg-diff-hard",
    hoverBgClass: "hover:brightness-95",
  },
];

export const DifficultySelector = ({
  operation,
  onSelectDifficulty,
}: DifficultySelectorProps) => {
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

      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-16">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-graphite-light mb-3">
              Paso 2 de 2
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-graphite">
              Elige el nivel.
            </h1>
          </div>

          <div className="flex flex-col gap-3">
            {DIFFICULTIES.map((diff) => (
              <button
                key={diff.level}
                type="button"
                onClick={() => onSelectDifficulty(diff.level)}
                className={`group flex items-baseline justify-between gap-6 p-6 md:p-7 ${diff.bgClass} ${diff.hoverBgClass} rounded-lg transition-all text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-graphite focus-visible:ring-offset-2 focus-visible:ring-offset-paper`}
              >
                <span className="text-3xl md:text-4xl font-bold text-graphite">
                  {DIFFICULTY_LABELS[diff.level]}
                </span>
                <span className="text-sm md:text-base font-mono font-medium text-graphite/75 tabular-nums">
                  {DIFFICULTY_RANGES[operation][diff.level]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
