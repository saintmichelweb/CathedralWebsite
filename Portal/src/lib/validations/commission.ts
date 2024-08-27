
import { z } from "zod";

export type AddCommissionForm = z.infer<typeof commissionSchema>;

export const commissionSchema = z.object({
    name_en: z
        .string()
        .trim()
        .min(1, { message: "Commission name_en is required" }),
    name_fr: z
        .string()
        .trim()
        .min(1, { message: "Commission name_fr is required" }),
    name_rw: z
        .string()
        .trim()
        .min(1, { message: "Commission name_rw is required" }),
    contact_person_name: z
        .string()
        .trim()
        .min(1, { message: "Commission contact_person_name is required" }),
    contact_person_role: z
        .string()
        .trim()
        .min(1, { message: "Commission contact_person_role is required" }),
    contact_person_phone_number: z
        .string()
        .trim()
        .min(1, { message: "Commission contact_person_phone_number is required" }),
    contact_person_email: z
        .string()
        .trim()
        .min(1, { message: "Commission contact_person_email is required" }),
    description_en: z
        .string()
        .trim()
        .min(1, { message: "Commission description_en is required" }),
    description_fr: z
        .string()
        .trim()
        .min(1, { message: "Commission description_fr is required" }),
    description_rw: z
        .string()
        .trim()
        .min(1, { message: "Commission description_rw is required" }),
    backgroundImageId: z
        .number()
        .nullable()
});

export type UpdateCommissionForm = z.infer<typeof updateCommissionSchema>;

export const updateCommissionSchema = z.object({
    name_en: z
        .string()
        .trim()
        .min(1, { message: "Commission name_en is required" }),
    name_fr: z
        .string()
        .trim()
        .min(1, { message: "Commission name_fr is required" }),
    name_rw: z
        .string()
        .trim()
        .min(1, { message: "Commission name_rw is required" }),
    contact_person_name: z
        .string()
        .trim()
        .min(1, { message: "Commission contact_person_name is required" }),
    contact_person_role: z
        .string()
        .trim()
        .min(1, { message: "Commission contact_person_role is required" }),
    contact_person_phone_number: z
        .string()
        .trim()
        .min(1, { message: "Commission contact_person_phone_number is required" }),
    contact_person_email: z
        .string()
        .trim()
        .min(1, { message: "Commission contact_person_email is required" }),
    description_en: z
        .string()
        .trim()
        .min(1, { message: "Commission description_en is required" }),
    description_fr: z
        .string()
        .trim()
        .min(1, { message: "Commission description_fr is required" }),
    description_rw: z
        .string()
        .trim()
        .min(1, { message: "Commission description_rw is required" }),
    backgroundImageId: z
        .number()
        .nullable(),
    commissionId: z.number()
        .nullable(),
});