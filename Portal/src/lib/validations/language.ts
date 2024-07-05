import { z } from "zod";

export type MassLanguageForm = z.infer<typeof massLanguageSchema>;

export const massLanguageSchema = z.object({
  language: z
    .string()
    .trim()
    .min(1, { message: "Language is required" }),
});
