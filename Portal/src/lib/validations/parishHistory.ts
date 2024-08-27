import { z } from "zod";

export type ParishHistoryForm = z.infer<typeof parishHistorySchema>;

export const parishHistorySchema = z.object({
    parishHistory_en: z
        .string()
        .trim()
        .min(1, { message: "Parish History is required" }),
    parishHistory_fr: z
        .string()
        .trim()
        .min(1, { message: "Parish History is required" }),
    parishHistory_rw: z
        .string()
        .trim()
        .min(1, { message: "Parish History is required" }),
    mission_en: z
        .string()
        .trim()
        .min(1, { message: "Parish mission is required" }),
    mission_fr: z
        .string()
        .trim()
        .min(1, { message: "Parish mission is required" }),
    mission_rw: z
        .string()
        .trim()
        .min(1, { message: "Parish mission is required" }),
    vision_en: z
        .string()
        .trim()
        .min(1, { message: "Parish vision is required" }),
    vision_fr: z
        .string()
        .trim()
        .min(1, { message: "Parish vision is required" }),
    vision_rw: z
        .string()
        .trim()
        .min(1, { message: "Parish vision is required" }),
});