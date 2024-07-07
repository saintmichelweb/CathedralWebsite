import { z } from "zod";

export type MassTimesForm = z.infer<typeof MassTimesSchema>;

export const MassTimesSchema = z.object({
  location: z.string().min(1, { message: "Mass location is required" }),
  language: z.string().min(1, { message: "Mass language is required" }),
  day: z.string(),
  time: z.string(),
});
