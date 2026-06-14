# ADR 0001 — Strategy axis for mental-math modes

Status: Accepted (2026-06-13)

## Context

The app generates a **Question** from an (**Operation**, **Difficulty**) pair. We want
to add mental-math *strategies* — ×11, near-base products (98×97), complements to
100/1000, two-digit squares, etc.

A strategy is **not a new Operation**. ×11 is still multiplication; "1000 − 376" is
still subtraction. A strategy is one of:

1. **A constrained generator for an existing Operation** — same `Question` shape
   (`num1`, `num2`, single integer `correctAnswer`), operands drawn from a special
   distribution. (×11, ×25, squares, near-base, complements, …) — the common case.
2. **A different answer shape** — division-with-remainder (two fields),
   divisibility (boolean), estimation (tolerance), fraction conversions. Needs
   `Question`/validator/input-UI changes. *Out of scope here.*
3. **A teaching method, not a generator** — left-to-right, partial products, FOIL.
   The problem is identical regardless of method, so these are *hints*, never modes.

Two facts about the current code shape the decision:

- `GameProgress.stats` is a fixed four-key object (`addition` … `division`). New
  top-level Operations would force that shape — and `OperationSelector`'s 4-tile
  grid — to grow, mixing "Multiplication" with "Multiply by 11" as peers.
- A strategy is semantically a *sub-type* of an Operation.

## Decision

Introduce **Strategy** as a dimension *orthogonal to* Operation. A Strategy belongs
to one base Operation, carries its own **Difficulty** levels, and owns a generator.

```ts
interface Strategy {
  id: StrategyId;                 // "times-eleven", "near-base", …
  operation: Operation;           // base op — drives stats roll-up + display symbol
  label: string;                  // UI label (es)
  difficulties: Difficulty[];     // a Strategy may offer fewer levels than the 4
  describe: Record<Difficulty, string>; // range hint shown on the difficulty screen
  generate: (difficulty: Difficulty) => Question;
}
```

- Strategies live in a registry: `STRATEGIES: Record<StrategyId, Strategy>`, with
  `getStrategy(id)` and `strategiesForOperation(op)`.
- The four built-in generators stay as the **standard** mode of each Operation
  (no Strategy id). `generateForRound(operation, difficulty, strategyId?)` resolves:
  strategy generator when `strategyId` is set, else the standard `generateQuestion`.
- **Stats roll up by `strategy.operation`** — ×11 results count toward multiplication.
  The fixed four-key `GameProgress.stats` shape is preserved.
- **Navigation** gains a Strategy step:
  `operation-select → strategy-select?operation=X → difficulty-select?operation=X&strategy=S → game?…&strategy=S`.
  `strategy` is an optional search param; absent ⇒ standard. `operation-select`
  skips the Strategy screen for Operations that have no special strategies, so the
  existing two-step flow is unchanged for them.
- The difficulty screen renders the **Strategy's** `difficulties` and `describe`
  labels (so ×11 can omit `expert`, etc.).

The current four-operation behavior is exactly "the standard strategy" — this is a
generalization, not a rewrite. Adding any type-1 strategy is then a drop-in:
a generator + its level table, no model changes.

## Consequences

- Type-1 strategies (the majority) are cheap, isolated additions.
- Type-2 strategies (remainder, divisibility, fractions, estimation) still need the
  answer-model/input work — tracked separately, alongside combined-operations.
- New domain term **Strategy** added to `CONTEXT.md`.
- Slight extra plumbing on `useRound` (optional `strategyId`) and the difficulty
  screen (optional `difficulties`/`describe`).

## First implementation

`times-eleven` (multiplication), levels easy/medium/hard:

| Level | Multiplicand | Note |
|-------|--------------|------|
| easy   | 10–99, tens+units ≤ 9 | clean trick, no inner carry (e.g. 23×11=253) |
| medium | 10–99                 | carry allowed (e.g. 67×11=737) |
| hard   | 100–999               | three-digit ×11 |

`num1` = multiplicand, `num2` = 11, `correctAnswer` = `num1 × 11`. No `expert` level.
