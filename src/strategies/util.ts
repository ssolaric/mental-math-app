export const randomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/** Pick one element of a non-empty array at random. */
export const pick = <T>(items: readonly T[]): T =>
  items[randomInt(0, items.length - 1)];

/**
 * A number sitting within ±delta of a random multiple of `unit` (never exactly on
 * it) — the "almost-round" operand that compensation strategies lean on.
 */
export const nearRound = (
  unit: number,
  rounds: [number, number],
  delta: number,
): number => {
  const round = randomInt(rounds[0], rounds[1]) * unit;
  let offset = 0;
  while (offset === 0) {
    offset = randomInt(-delta, delta);
  }
  return round + offset;
};
