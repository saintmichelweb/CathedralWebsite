import { z } from "zod";

export type TopNewsAndNoticesForm = z.infer<
  typeof topParishNewsAndNoticesSchema
>;

export const topParishNewsAndNoticesSchema = z.object({
  title_en: z
    .string()
    .trim()
    .min(1, { message: "Title (en) is required" }),
  title_fr: z
    .string()
    .trim()
    .min(1, { message: "Title (fr) is required" }),
  title_rw: z
    .string()
    .trim()
    .min(1, { message: "Title (rw) is required" }),
  description_en: z
    .string()
    .trim()
    .min(1, { message: "Description (en) is required" }),
  description_fr: z
    .string()
    .trim()
    .min(1, { message: "Description (fr) is required" }),
  description_rw: z
    .string()
    .trim()
    .min(1, { message: "Description (rw) is required" }),
});

export type UpdateTopNewsAndNoticesForm = z.infer<typeof updateTopParishNewsAndNoticesSchema>;

export const updateTopParishNewsAndNoticesSchema = z.object({
  title_en: z
    .string()
    .trim()
    .min(1, { message: "Title (en) is required" }),
  title_fr: z
    .string()
    .trim()
    .min(1, { message: "Title (fr) is required" }),
  title_rw: z
    .string()
    .trim()
    .min(1, { message: "Title (rw) is required" }),
  description_en: z
    .string()
    .trim()
    .min(1, { message: "Description (en) is required" }),
  description_fr: z
    .string()
    .trim()
    .min(1, { message: "Description (fr) is required" }),
  description_rw: z
    .string()
    .trim()
    .min(1, { message: "Description (rw) is required" }),
  topNewsOrNoticeId: z.number(),
  isActive: z.boolean()
});
