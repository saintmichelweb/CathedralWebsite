import { z } from "zod";

export type AddWelcomeMessageForm = z.infer<
    typeof WelcomeMessageSchema
>;

export const WelcomeMessageSchema = z.object({
    welcomeMessage_en: z
        .string()
        .trim()
        .min(1, { message: "Title (EN) is required" }),
    welcomeMessage_fr: z
        .string()
        .trim()
        .min(1, { message: "Title (FR) is required" }),
    welcomeMessage_rw: z
        .string()
        .trim()
        .min(1, { message: "Title (RW) is required" }),
    backgroundImageId: z.number().nullable(),
});

export type UpdateWelcomeMessageForm = z.infer<typeof updateWelcomeMessageSchema>;

export const updateWelcomeMessageSchema = z.object({
    welcomeMessage_en: z
        .string()
        .trim()
        .min(1, { message: "Title (EN) is required" }),
    welcomeMessage_fr: z
        .string()
        .trim()
        .min(1, { message: "Title (FR) is required" }),
    welcomeMessage_rw: z
        .string()
        .trim()
        .min(1, { message: "Title (RW) is required" }),
    welcomeMessageId: z.number(),
    backgroundImageId: z.number(),
});
