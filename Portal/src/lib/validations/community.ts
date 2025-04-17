
import { z } from "zod";

export type AddCommunityForm = z.infer<typeof communitySchema>;

export const communitySchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, { message: "Community name is required" }),
});

export type UpdateCommunityForm = z.infer<typeof updateCommunitySchema>;

export const updateCommunitySchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, { message: "Community name is required" }),
    communityId: z.number()
        .nullable(),
});