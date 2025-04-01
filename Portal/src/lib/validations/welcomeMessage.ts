import { z } from "zod";

export type AddWelcomeMessageForm = z.infer<
    typeof WelcomeMessageSchema
>;

export const WelcomeMessageSchema = z.object({
    welcomeMessage_en: z
        .string()
        .trim()
        .min(1, { message: "Title (en) is required" }),
    welcomeMessage_fr: z
        .string()
        .trim()
        .min(1, { message: "Title (fr) is required" }),
    welcomeMessage_rw: z
        .string()
        .trim()
        .min(1, { message: "Title (rw) is required" }),
    backgroundImageId: z.number().nullable().default(null),
});

export type UpdateWelcomeMessageForm = z.infer<typeof updateWelcomeMessageSchema>;

export const updateWelcomeMessageSchema = z.object({
    welcomeMessage_en: z
        .string()
        .trim()
        .min(1, { message: "Title (en) is required" }),
    welcomeMessage_fr: z
        .string()
        .trim()
        .min(1, { message: "Title (fr) is required" }),
    welcomeMessage_rw: z
        .string()
        .trim()
        .min(1, { message: "Title (rw) is required" }),
    welcomeMessageId: z.number(),
    backgroundImageId: z.number().nullable().default(null),
});
