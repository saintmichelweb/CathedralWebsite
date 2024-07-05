import { z } from "zod";

export type MassTimesForm = z.infer<typeof MassTimesSchema>;

export const MassTimesSchema = z.object({
  location: z.number().min(1, { message: "Mass location is required" }),
  language: z.number().min(1, { message: "Mass language is required" }),
  day: z.string(),
  time: z.string(),
});
