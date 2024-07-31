import { z } from "zod";

export type AddRecentEventsForm = z.infer<typeof recentEventsSchema>;

export const recentEventsSchema = z.object({
  title: z.string().trim().min(1, { message: "Event title is required" }),
  description: z
    .string()
    .trim()
    .min(1, { message: "Event description is required" }),
  backgroungImageId: z.number().nullable(),
  event_date: z.string().trim().min(1, { message: "Event date title is required" }),
});

export type UpdateRecentEventsForm = z.infer<typeof updateRecentEventsSchema>;

export const updateRecentEventsSchema = z.object({
  title: z.string().trim().min(1, { message: "Event title is required" }),
  description: z
    .string()
    .trim()
    .min(1, { message: "Event description is required" }),
  recentEventId: z.number(),
  backgroungImageId: z.number().nullable(),
  event_date: z.string().trim().min(1, { message: "Event date title is required" }),
  isActive: z.boolean()
});
