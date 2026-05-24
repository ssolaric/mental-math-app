import type { GameProgress } from "../types";

export interface ProgressStorage {
  read(): GameProgress | null;
  write(progress: GameProgress): void;
  clear(): void;
}

const STORAGE_KEY = "mental-math-progress";

export const browserStorageAdapter: ProgressStorage = {
  read() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as GameProgress) : null;
    } catch {
      return null;
    }
  },
  write(progress) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // swallow: quota, private-mode lockouts, etc. — UI keeps working from memory
    }
  },
  clear() {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // see write()
    }
  },
};

export const inMemoryStorageAdapter = (
  seed: GameProgress | null = null,
): ProgressStorage => {
  let value: GameProgress | null = seed;
  return {
    read: () => value,
    write: (p) => {
      value = p;
    },
    clear: () => {
      value = null;
    },
  };
};
