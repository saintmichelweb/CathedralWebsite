import { z } from "zod";

export type LanguageForm = z.infer<typeof massLanguageSchema>;

export const massLanguageSchema = z.object({
  language: z
    .string()
    .trim()
    .min(1, { message: "Language is required" }),
});


export type UpdateLanguageForm = z.infer<typeof updateMassLanguageSchema>;

export const updateMassLanguageSchema = z.object({
  language: z
    .string()
    .trim()
    .min(1, { message: "Location Name is required" }),
  languageId: z.number(),
  isActive: z.boolean()
});