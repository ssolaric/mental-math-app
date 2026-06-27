export const randomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Integer floor of the `index`-th root of `radicand`, computed without trusting
 * Math.pow's floating point (which can sit a hair under an exact root). Seeds
 * from the float estimate, then steps to the true floor.
 */
export const floorRoot = (radicand: number, index: number): number => {
  let r = Math.max(1, Math.floor(radicand ** (1 / index)));
  while ((r + 1) ** index <= radicand) r++;
  while (r ** index > radicand) r--;
  return r;
};

/** Whether `radicand` is an exact `index`-th power of some integer. */
export const isPerfectPower = (radicand: number, index: number): boolean =>
  floorRoot(radicand, index) ** index === radicand;

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
