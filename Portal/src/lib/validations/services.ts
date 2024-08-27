import { z } from "zod";

export type AddServiceForm = z.infer<typeof serviceSchema>;

export const serviceSchema = z.object({
    name_en: z
        .string()
        .trim()
        .min(1, { message: "Service name_en is required" }),
    name_fr: z
        .string()
        .trim()
        .min(1, { message: "Service name_fr is required" }),
    name_rw: z
        .string()
        .trim()
        .min(1, { message: "Service name_rw is required" }),
    description_en: z
        .string()
        .trim()
        .min(1, { message: "Service description_en is required" }),
    description_fr: z
        .string()
        .trim()
        .min(1, { message: "Service description_fr is required" }),
    description_rw: z
        .string()
        .trim()
        .min(1, { message: "Service description_rw is required" }),
    contact_person_name: z
        .string()
        .trim()
        .min(1, { message: "Service contact_person_name is required" }),
    contact_person_phone_number: z
        .string()
        .trim()
        .min(1, { message: "Service contact_person_phone_number is required" }),
    work_days: z
        .string()
        .trim()
        .min(1, { message: "Service start_date is required" }),
    work_hours: z
        .string()
        .trim()
        .min(1, { message: "Service end_date is required" }),
    backgroundImageId: z
        .number()
        .nullable()
});

export type UpdateServiceForm = z.infer<typeof updateServiceSchema>;

export const updateServiceSchema = z.object({
    name_en: z
        .string()
        .trim()
        .min(1, { message: "Service name_en is required" }),
    name_fr: z
        .string()
        .trim()
        .min(1, { message: "Service name_fr is required" }),
    name_rw: z
        .string()
        .trim()
        .min(1, { message: "Service name_rw is required" }),
    description_en: z
        .string()
        .trim()
        .min(1, { message: "Service description_en is required" }),
    description_fr: z
        .string()
        .trim()
        .min(1, { message: "Service description_fr is required" }),
    description_rw: z
        .string()
        .trim()
        .min(1, { message: "Service description_rw is required" }),
    contact_person_name: z
        .string()
        .trim()
        .min(1, { message: "Service contact_person_name is required" }),
    contact_person_phone_number: z
        .string()
        .trim()
        .min(1, { message: "Service contact_person_phone_number is required" }),
    work_days: z
        .string()
        .trim()
        .min(1, { message: "Service start_date is required" }),
    work_hours: z
        .string()
        .trim()
        .min(1, { message: "Service end_date is required" }),
    backgroundImageId: z
        .number()
        .nullable(),
    // .min(1, { message: "Service backgroundImage is required" }),
    servicesId: z.number()
        .nullable(),
});

