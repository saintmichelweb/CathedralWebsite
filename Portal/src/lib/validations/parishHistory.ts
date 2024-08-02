import { z } from "zod";

export type ParishHistoryForm = z.infer<typeof parishHistorySchema>;

export const parishHistorySchema = z.object({
    parishHistory_en: z
    .string()
    .trim()
    .min(1, { message: "Language is required" }),
    parishHistory_fr: z
    .string()
    .trim()
    .min(1, { message: "Language is required" }),
    parishHistory_rw: z
    .string()
    .trim()
    .min(1, { message: "Language is required" }),
});