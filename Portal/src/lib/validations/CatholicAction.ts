import { z } from "zod";

// Schema for the AddAction form
export const actionSchema = z.object({
    description_en: z
        .string()
        .min(10, { message: "Description must be at least 10 characters long." })
        .max(500, { message: "Description must not exceed 500 characters." }),

    name: z.string().min(2, { message: "Name is required." }),
    description_rw: z
        .string()
        .min(10, { message: "Description must be at least 10 characters long." })
        .max(500, { message: "Description must not exceed 500 characters." }),
    leaderName: z.string().min(2, { message: "Leader name is required." }),
    phone: z
        .string()
        .regex(/^\+?[0-9]{9,15}$/, { message: "Phone number is invalid." }),
});

export type AddActionForm = z.infer<typeof actionSchema>;
