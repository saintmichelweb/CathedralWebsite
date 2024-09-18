import { z } from "zod";

export type AddChoirsForm = z.infer<typeof choirsSchema>;

export const choirsSchema = z.object({
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

export type UpdateChoirsForm = z.infer<typeof updateChoirsSchema>;

export const updateChoirsSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, { message: "Name is required" }),
    description_en: z
        .string()
        .trim()
        .min(1, { message: "Description (EN) is required" }),
    description_fr: z
        .string()
        .trim()
        .min(1, { message: "Description (FR) is required" }),
    description_rw: z
        .string()
        .trim()
        .min(1, { message: "Description (RW) is required" }),
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
    choirId: z.number(),
});
