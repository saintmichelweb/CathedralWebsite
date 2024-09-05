import { z } from "zod";

export type LocationForm = z.infer<typeof LocationSchema>;

export const LocationSchema = z.object({
  location: z
    .string()
    .trim()
    .min(1, { message: "Location Name is required" }),
    isMassLocation: z.boolean(),
});

export type UpdateLocationForm = z.infer<typeof updateMassLocationSchema>;

export const updateMassLocationSchema = z.object({
  location: z
    .string()
    .trim()
    .min(1, { message: "Location Name is required" }),
  locationId: z.number(),
  isActive: z.boolean(),
  isMassLocation: z.boolean(),
});
