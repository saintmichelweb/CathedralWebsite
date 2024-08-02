import { z } from "zod";

export type TopNewsAndNoticesForm = z.infer<
  typeof topParishNewsAndNoticesSchema
>;

export const topParishNewsAndNoticesSchema = z.object({
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
});

export type UpdateTopNewsAndNoticesForm = z.infer<typeof updateTopParishNewsAndNoticesSchema>;

export const updateTopParishNewsAndNoticesSchema = z.object({
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
  topNewsOrNoticeId: z.number(),
  isActive: z.boolean()
});
