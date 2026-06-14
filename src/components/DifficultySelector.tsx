import { Link } from "@tanstack/react-router";
import type { Difficulty, Operation } from "../types";

interface DifficultySelectorProps {
  operation: Operation;
  onSelectDifficulty: (difficulty: Difficulty) => void;
  /** Where the Back link returns to (the screen this one was reached from). */
  backTo: "/strategy-select" | "/operation-select";
  /** Levels to offer (defaults to all four). A strategy may offer fewer. */
  difficulties?: Difficulty[];
  /** Per-level range hint overrides (defaults to the operation's ranges). */
  describe?: Partial<Record<Difficulty, string>>;
  /** Optional line above the heading, e.g. the active strategy's name. */
  subtitle?: string;
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
  expert: "Experto",
};

const DIFFICULTY_RANGES: Record<Operation, Record<Difficulty, string>> = {
  addition: {
    easy: "1-9 + 1-9",
    medium: "10-99 + 10-99",
    hard: "100-999 + 10-99",
    expert: "100-999 + 100-999",
  },
  subtraction: {
    easy: "11-18 − 2-9",
    medium: "20-99 − 11-89",
    hard: "100-999 − 10-99",
    expert: "100-999 − 100-999",
  },
  multiplication: {
    easy: "1-9 × 1-9",
    medium: "2-9 × 10-99",
    hard: "11-30 × 11-30",
    expert: "11-99 × 11-99",
  },
  division: {
    easy: "Datos básicos",
    medium: "20-99 ÷ 2-9",
    hard: "100-999 ÷ 2-9",
    expert: "100-999 ÷ 11-25",
  },
};

interface DifficultyMeta {
  level: Difficulty;
  bgClass: string;
  hoverBgClass: string;
  /**
   * Range-label color. Lighter tiles use graphite at 75% opacity (passes AA);
   * the darker Experto fill needs full-strength graphite to clear 4.5:1.
   */
  rangeLabelClass: string;
}

const DIFFICULTIES: ReadonlyArray<DifficultyMeta> = [
  {
    level: "easy",
    bgClass: "bg-diff-easy",
    hoverBgClass: "hover:brightness-95",
    rangeLabelClass: "text-graphite/75",
  },
  {
    level: "medium",
    bgClass: "bg-diff-medium",
    hoverBgClass: "hover:brightness-95",
    rangeLabelClass: "text-graphite/75",
  },
  {
    level: "hard",
    bgClass: "bg-diff-hard",
    hoverBgClass: "hover:brightness-95",
    rangeLabelClass: "text-graphite/75",
  },
  {
    level: "expert",
    bgClass: "bg-diff-expert",
    hoverBgClass: "hover:brightness-95",
    rangeLabelClass: "text-graphite",
  },
];

export const DifficultySelector = ({
  operation,
  onSelectDifficulty,
  backTo,
  difficulties,
  describe,
  subtitle,
}: DifficultySelectorProps) => {
  const tiles = difficulties
    ? DIFFICULTIES.filter((d) => difficulties.includes(d.level))
    : DIFFICULTIES;
  const rangeLabel = (level: Difficulty): string =>
    describe?.[level] ?? DIFFICULTY_RANGES[operation][level];

  // The difficulty screen is the last step. Reached via the strategy selector it
  // is step 3 of 3; reached straight from the operation selector it is step 2 of
  // 2. When a strategy is active its name rides alongside the counter as context.
  const stepLabel =
    backTo === "/strategy-select" ? "Paso 3 de 3" : "Paso 2 de 2";
  const eyebrow = subtitle ? `${stepLabel} · ${subtitle}` : stepLabel;

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <header className="px-6 md:px-12 py-6">
        {backTo === "/strategy-select" ? (
          <Link
            to="/strategy-select"
            search={{ operation }}
            className="text-sm font-medium uppercase tracking-[0.18em] text-graphite-light hover:text-graphite-mid transition-colors"
          >
            ← {OPERATION_LABELS[operation]}
          </Link>
        ) : (
          <Link
            to="/operation-select"
            className="text-sm font-medium uppercase tracking-[0.18em] text-graphite-light hover:text-graphite-mid transition-colors"
          >
            ← {OPERATION_LABELS[operation]}
          </Link>
        )}
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-16">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-graphite-light mb-3">
              {eyebrow}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-graphite">
              Elige el nivel.
            </h1>
          </div>

          <div className="flex flex-col gap-3">
            {tiles.map((diff) => (
              <button
                key={diff.level}
                type="button"
                onClick={() => onSelectDifficulty(diff.level)}
                className={`group flex items-baseline justify-between gap-6 p-6 md:p-7 ${diff.bgClass} ${diff.hoverBgClass} rounded-lg transition-all text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-graphite focus-visible:ring-offset-2 focus-visible:ring-offset-paper`}
              >
                <span className="text-3xl md:text-4xl font-bold text-graphite">
                  {DIFFICULTY_LABELS[diff.level]}
                </span>
                <span
                  className={`text-sm md:text-base font-mono font-medium ${diff.rangeLabelClass} tabular-nums`}
                >
                  {rangeLabel(diff.level)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
