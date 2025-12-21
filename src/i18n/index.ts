import type { Locale, Translations } from './types';
import { es } from './es';
import { en } from './en';

export const translations: Record<Locale, Translations> = {
  es,
  en,
};

export type { Locale, Translations } from './types';
