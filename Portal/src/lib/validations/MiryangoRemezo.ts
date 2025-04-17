
import { z } from "zod";

export type AddMiryangoRemezoForm = z.infer<typeof miryangoRemezoSchema>;
export const miryangoRemezoSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, { message: "MiryangoRemezo title is required" }),
    header: z
        .string()
        .trim()
        .min(1, { message: "MiryangoRemezo header is required" }),
    phone: z
        .string()
        .trim()
        .min(1, { message: "MiryangoRemezo phone is required" }),
    mpuzaId: z
        .number()
        .min(1, { message: "mpuzaMiryangoRemezo id is required" }),
});

export type UpdateMiryangoRemezoForm = z.infer<typeof updateMiryangoRemezoSchema>;

export const updateMiryangoRemezoSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, { message: "MiryangoRemezo title is required" }),
    header: z
        .string()
        .trim()
        .min(1, { message: "MiryangoRemezo header is required" }),
    phone: z
        .string()
        .trim()
        .min(1, { message: "MiryangoRemezo phone is required" }),    
    mpuzaId: z
        .number()
        .min(1, { message: "mpuzaMiryangoRemezo id is required" }),
    muryangoRemezoId: z
        .number()
        .nullable(),
});