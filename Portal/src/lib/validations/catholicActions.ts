import { z } from "zod";

export type AddCatholicActionsForm = z.infer<typeof catholicActionsSchema>;

export const catholicActionsSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, { message: "Name is required" }),
    description_en: z
        .string()
        .trim()
        .min(1, { message: "Description is required" }),
    description_fr: z
        .string()
        .trim()
        .min(1, { message: "Description is required" }),
    description_rw: z
        .string()
        .trim()
        .min(1, { message: "Description is required" }),
    leader: z
        .string()
        .trim()
        .min(1, { message: "Leader is required" }),
    telephone: z
        .string()
        .trim()
        .min(1, { message: "Telephone is required" }),
    backgroundImageId: z
        .number()
        .nullable()
        .default(null)
});

export type UpdateCatholicActionsForm = z.infer<typeof updateCatholicActionsSchema>;

export const updateCatholicActionsSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, { message: "Name is required" }),
    description_en: z
        .string()
        .trim()
        .min(1, { message: "Description (en) is required" }),
    description_fr: z
        .string()
        .trim()
        .min(1, { message: "Description (fr) is required" }),
    description_rw: z
        .string()
        .trim()
        .min(1, { message: "Description (rw) is required" }),
    leader: z
        .string()
        .trim()
        .min(1, { message: "Leader is required" }),
    telephone: z
        .string()
        .trim()
        .min(1, { message: "Telephone is required" }),
    isActive: z.boolean(),
    backgroundImageId: z
        .number()
        .nullable()
        .default(null),
    catholicActionId: z.number(),
});
