import 'server-only';
import { i18nConfig } from '@/app/lib/i18nConfig';

export type Locale = (typeof i18nConfig.locales)[number]; // Define Locale based on i18nConfig

const dictionaries: Record<Locale, () => Promise<unknown>> = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  nl: () => import('../dictionaries/nl.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  if (!i18nConfig.locales.includes(locale)) {
    throw new Error(`Locale ${locale} is not supported.`);
  }
  return dictionaries[locale]();
};
