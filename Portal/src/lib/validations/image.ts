import { z } from "zod";

export type BannerImageForm = z.infer<typeof bannerImageSchema>;

export const bannerImageSchema = z.object({
    bannerDescription_en: z
        .string()
        .trim()
        .min(1, { message: "Location Name is required" }),
    bannerDescription_rw: z
        .string()
        .trim()
        .min(1, { message: "Location Name is required" }),
    bannerDescription_fr: z
        .string()
        .trim()
        .min(1, { message: "Location Name is required" }),
    // isBannerImage: z.boolean().default(false)
});


export type UpdateBannerImageForm = z.infer<typeof updateBannerImageSchema>;

export const updateBannerImageSchema = z.object({
    bannerDescription_en: z
        .string()
        .trim()
        .min(1, { message: "Location Name is required" }),
    bannerDescription_rw: z
        .string()
        .trim()
        .min(1, { message: "Location Name is required" }),
    bannerDescription_fr: z
        .string()
        .trim()
        .min(1, { message: "Location Name is required" }),
    imageId: z.number(),
    isActive: z.boolean()
});