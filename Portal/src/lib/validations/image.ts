import { z } from "zod";

export type BannerImageForm = z.infer<typeof bannerImageSchema>;

export const bannerImageSchema = z.object({
    bannerDescription: z
        .string()
        .trim()
        .min(1, { message: "Banner Description is required" }),
    // isBannerImage: z.boolean().default(false)
});


export type UpdateBannerImageForm = z.infer<typeof updateBannerImageSchema>;

export const updateBannerImageSchema = z.object({
    bannerDescription: z
        .string()
        .trim()
        .min(1, { message: "Location Name is required" }),
    bannerImageId: z.number(),
    isActive: z.boolean()
});