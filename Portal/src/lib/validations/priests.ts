import { z } from "zod";

export type AddPriestsForm = z.infer<typeof priestsSchema>;

export const priestsSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, { message: "Name is required" }),
    title: z
        .string()
        .trim()
        .min(1, { message: "Title is required" }),
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
    backgroundImageId: z
        .number()
        .nullable()
        .default(null)
});

export type UpdatePriestsForm = z.infer<typeof updatePriestsSchema>;

export const updatePriestsSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, { message: "Name is required" }),
    title: z
        .string()
        .trim()
        .min(1, { message: "Title is required" }),
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
    backgroundImageId: z
        .number()
        .nullable()
        .default(null),
    priestId: z.number(),
});
