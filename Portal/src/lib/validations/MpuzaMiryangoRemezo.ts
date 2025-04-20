
import { z } from "zod";

export type AddMpuzaMiryangoRemezoForm = z.infer<typeof mpuzaMiryangoRemezoSchema>;
export const mpuzaMiryangoRemezoSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, { message: "MpuzaMiryangoRemezo title is required" }),
    leader: z
        .string()
        .trim()
        .min(1, { message: "MpuzaMiryangoRemezo leader is required" }),
    phone: z
        .string()
        .trim()
        .min(1, { message: "MpuzaMiryangoRemezo phone is required" }),
    description_en: z
        .string()
        .trim()
        .min(1, { message: "MpuzaMiryangoRemezo description_en is required" }),
    description_fr: z
        .string()
        .trim()
        .min(1, { message: "MpuzaMiryangoRemezo description_fr is required" }),
    description_rw: z
        .string()
        .trim()
        .min(1, { message: "MpuzaMiryangoRemezo description_rw is required" }),
    community: z
        .number()
        .min(1, { message: "Community is required" }),
    backgroundImageId: z
        .number()
        .nullable()
});

export type UpdateMpuzaMiryangoRemezoForm = z.infer<typeof updateMpuzaMiryangoRemezoSchema>;

export const updateMpuzaMiryangoRemezoSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, { message: "MpuzaMiryangoRemezo title is required" }),
    leader: z
        .string()
        .trim()
        .min(1, { message: "MpuzaMiryangoRemezo leader is required" }),
    phone: z
        .string()
        .trim()
        .min(1, { message: "MpuzaMiryangoRemezo phone is required" }),
    description_en: z
        .string()
        .trim()
        .min(1, { message: "MpuzaMiryangoRemezo description_en is required" }),
    description_fr: z
        .string()
        .trim()
        .min(1, { message: "MpuzaMiryangoRemezo description_fr is required" }),
    description_rw: z
        .string()
        .trim()
        .min(1, { message: "MpuzaMiryangoRemezo description_rw is required" }),
    backgroundImageId: z
        .number()
        .nullable(),
    community: z
        .number()
        .min(1, { message: "Community is required" }),
    mpuzMiryangoRemezoId: z
        .number()
        .nullable(),
});