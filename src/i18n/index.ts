import { en } from "./en";
import { es } from "./es";
import type { Locale, Translations } from "./types";

export const translations: Record<Locale, Translations> = {
  es,
  en,
};

export type { Locale, Translations } from "./types";
