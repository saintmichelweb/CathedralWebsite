import { z } from "zod";

export type TopNewsAndNoticesForm = z.infer<
  typeof topParishNewsAndNoticesSchema
>;

export const topParishNewsAndNoticesSchema = z.object({
  title: z.string().trim().min(1, { message: "News title is required" }),
  description: z
    .string()
    .trim()
    .min(1, { message: "News description is required" }),
});

export type AddRecentEventsForm = z.infer<typeof recentEventsSchema>;

export const recentEventsSchema = z.object({
  title: z.string().trim().min(1, { message: "Event title is required" }),
  description: z
    .string()
    .trim()
    .min(1, { message: "Event description is required" }),
});

export type UpdateRecentEventsForm = z.infer<typeof updateRecentEventsSchema>;

export const updateRecentEventsSchema = z.object({
  title: z.string().trim().min(1, { message: "Event title is required" }),
  description: z
    .string()
    .trim()
    .min(1, { message: "Event description is required" }),
  recentEventId: z.number(),
  isActive: z.boolean()
});
