import { z } from "zod";

export type ParishHistoryForm = z.infer<typeof parishHistorySchema>;

export const parishHistorySchema = z.object({
    parishHistory: z
    .string()
    .trim()
    .min(1, { message: "Language is required" }),
});