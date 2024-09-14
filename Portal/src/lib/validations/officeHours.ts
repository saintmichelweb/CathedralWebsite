import { z } from "zod";

export type OfficeHoursForm = z.infer<typeof OfficeHoursSchema>;

export const OfficeHoursSchema = z.object({
  office_place: z
    .number()
    .min(1, { message: "Office_place is required" }),
  day_en: z
    .string()
    .trim()
    .min(1, { message: "day_en is required" }),
  day_fr: z
    .string()
    .trim()
    .min(1, { message: "day_fr is required" }),
  day_rw: z
    .string()
    .trim()
    .min(1, { message: "day_rw is required" }),
  time: z
    .string()
    .trim()
    .min(1, { message: "Time is required" }),
});

export type UpdateOfficeHoursForm = z.infer<typeof UpdateOfficeHoursSchema>;

export const UpdateOfficeHoursSchema = z.object({
  OfficeHourId: z.number(),
  office_place: z
    .number()
    .min(1, { message: "Office_place is required" }),
  day_en: z
    .string()
    .trim()
    .min(1, { message: "day_en is required" }),
  day_fr: z
    .string()
    .trim()
    .min(1, { message: "day_fr is required" }),
  day_rw: z
    .string()
    .trim()
    .min(1, { message: "day_rw is required" }),
  time: z
    .string()
    .trim()
    .min(1, { message: "Time is required" }),
  isActive: z.boolean()
});
