import { z } from "zod";

export type MassLocationForm = z.infer<typeof massLocationSchema>;

export const massLocationSchema = z.object({
  location: z
    .string()
    .trim()
    .min(1, { message: "Location Name is required" }),
});
