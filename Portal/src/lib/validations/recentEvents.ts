import { z } from "zod";

export type AddRecentEventsForm = z.infer<typeof recentEventsSchema>;

export const recentEventsSchema = z.object({
  title_en: z
    .string()
    .trim()
    .min(1, { message: "Title (EN) is required" }),
  title_fr: z
    .string()
    .trim()
    .min(1, { message: "Title (FR) is required" }),
  title_rw: z
    .string()
    .trim()
    .min(1, { message: "Title (RW) is required" }),
  description_en: z
    .string()
    .trim()
    .min(1, { message: "Description (EN) is required" }),
  description_fr: z
    .string()
    .trim()
    .min(1, { message: "Description (FR) is required" }),
  description_rw: z
    .string()
    .trim()
    .min(1, { message: "Description (RW) is required" }),
  backgroundImageId: z.number().nullable(),
  event_date: z.string().trim().min(1, { message: "Event date title is required" }),
});

export type UpdateRecentEventsForm = z.infer<typeof updateRecentEventsSchema>;

export const updateRecentEventsSchema = z.object({
  title_en: z
    .string()
    .trim()
    .min(1, { message: "Title (EN) is required" }),
  title_fr: z
    .string()
    .trim()
    .min(1, { message: "Title (FR) is required" }),
  title_rw: z
    .string()
    .trim()
    .min(1, { message: "Title (RW) is required" }),
  description_en: z
    .string()
    .trim()
    .min(1, { message: "Description (EN) is required" }),
  description_fr: z
    .string()
    .trim()
    .min(1, { message: "Description (FR) is required" }),
  description_rw: z
    .string()
    .trim()
    .min(1, { message: "Description (RW) is required" }),
  recentEventId: z.number(),
  backgroundImageId: z.number().nullable(),
  event_date: z.string().trim().min(1, { message: "Event date title is required" }),
  isActive: z.boolean()
});
