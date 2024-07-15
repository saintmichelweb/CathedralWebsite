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

export type UpdateTopNewsAndNoticesForm = z.infer<typeof updateTopParishNewsAndNoticesSchema>;

export const updateTopParishNewsAndNoticesSchema = z.object({
  title: z.string().trim().min(1, { message: "Event title is required" }),
  description: z
    .string()
    .trim()
    .min(1, { message: "Event description is required" }),
  topNewsOrNoticeId: z.number(),
  isActive: z.boolean()
});
