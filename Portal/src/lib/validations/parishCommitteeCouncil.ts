
import { z } from "zod";

export type AddParishCommitteeCouncilForm = z.infer<typeof parishCommitteeCouncilSchema>;

export const parishCommitteeCouncilSchema = z.object({
    names: z
        .string()
        .trim()
        .min(1, { message: "ParishCommitteeCouncil name_en is required" }),
    position_en: z
        .string()
        .trim()
        .min(1, { message: "ParishCommitteeCouncil position_en is required" }),
    position_fr: z
        .string()
        .trim()
        .min(1, { message: "ParishCommitteeCouncil position_fr is required" }),
    position_rw: z
        .string()
        .trim()
        .min(1, { message: "ParishCommitteeCouncil position_rw is required" }),
    telephone: z
        .string()
        .trim()
        .min(1, { message: "ParishCommitteeCouncil telephone is required" }),
    email: z
        .string()
        .trim()
        .min(1, { message: "ParishCommitteeCouncil email is required" }),
    description_en: z
        .string()
        .trim()
        .min(1, { message: "ParishCommitteeCouncil description_en is required" }),
    description_fr: z
        .string()
        .trim()
        .min(1, { message: "ParishCommitteeCouncil description_fr is required" }),
    description_rw: z
        .string()
        .trim()
        .min(1, { message: "ParishCommitteeCouncil description_rw is required" }),
    backgroundImageId: z
        .number()
        .nullable()
});

export type UpdateParishCommitteeCouncilForm = z.infer<typeof updateParishCommitteeCouncilSchema>;

export const updateParishCommitteeCouncilSchema = z.object({
    names: z
        .string()
        .trim()
        .min(1, { message: "ParishCommitteeCouncil name_en is required" }),
    position_en: z
        .string()
        .trim()
        .min(1, { message: "ParishCommitteeCouncil position_en is required" }),
    position_fr: z
        .string()
        .trim()
        .min(1, { message: "ParishCommitteeCouncil position_fr is required" }),
    position_rw: z
        .string()
        .trim()
        .min(1, { message: "ParishCommitteeCouncil position_rw is required" }),
    telephone: z
        .string()
        .trim()
        .min(1, { message: "ParishCommitteeCouncil telephone is required" }),
    email: z
        .string()
        .trim()
        .min(1, { message: "ParishCommitteeCouncil email is required" }),
    description_en: z
        .string()
        .trim()
        .min(1, { message: "ParishCommitteeCouncil description_en is required" }),
    description_fr: z
        .string()
        .trim()
        .min(1, { message: "ParishCommitteeCouncil description_fr is required" }),
    description_rw: z
        .string()
        .trim()
        .min(1, { message: "ParishCommitteeCouncil description_rw is required" }),
    backgroundImageId: z
        .number()
        .nullable(),
    parishCommitteeCouncilId: z.number()
        .nullable(),
});

