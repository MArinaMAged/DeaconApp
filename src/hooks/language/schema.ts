import { z } from 'zod';

export const enum SupportedLanguages {
  AR_AR = 'ar-AR',
  EN_EN = 'en-EN',
  FR_FR = 'fr-FR'
}

export const languageSchema = z.enum([
  SupportedLanguages.EN_EN,
  SupportedLanguages.FR_FR,
  SupportedLanguages.AR_AR,
]);

export type Language = z.infer<typeof languageSchema>;
