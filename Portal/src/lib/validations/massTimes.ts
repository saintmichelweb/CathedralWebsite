import { z } from "zod";

export type MassTimesForm = z.infer<typeof MassTimesSchema>;

export const MassTimesSchema = z.object({
  language: z
    .number()
    .min(1, { message: "Language is required" }),
  location: z
    .number()
    .min(1, { message: "Location is required" }),
    day_en: z
    .string()
    .trim()
    .min(1, { message: "Time is required" }),
  day_fr: z
    .string()
    .trim()
    .min(1, { message: "Time is required" }),
  day_rw: z
    .string()
    .trim()
    .min(1, { message: "Time is required" }),
  time: z
    .string()
    .trim()
    .min(1, { message: "Time is required" }),
});

export type UpdateMassTimesForm = z.infer<typeof UpdateMassTimesSchema>;

export const UpdateMassTimesSchema = z.object({
  massTimeId: z.number(),
  language: z
    .number()
    .min(1, { message: "Language is required" }),
  location: z
    .number()
    .min(1, { message: "Location is required" }),
    day_en: z
    .string()
    .trim()
    .min(1, { message: "Time is required" }),
  day_fr: z
    .string()
    .trim()
    .min(1, { message: "Time is required" }),
  day_rw: z
    .string()
    .trim()
    .min(1, { message: "Time is required" }),
  time: z
    .string()
    .trim()
    .min(1, { message: "Time is required" }),
  isActive: z.boolean()
});
