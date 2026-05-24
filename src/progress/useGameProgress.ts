import { useSyncExternalStore } from "react";
import type { GameProgress } from "../types";
import { getProgress, subscribeProgress } from "./progressStore";

export const useGameProgress = (): GameProgress =>
  useSyncExternalStore(subscribeProgress, getProgress);
