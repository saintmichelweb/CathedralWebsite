import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { z } from "zod";
import { AuthRequest } from "../../types/express";
import { RecentEventsEntity } from "../../entity/RecentEventsEntity";
import { ImageEntity } from "../../entity/ImagesEntity";

const recentEventSchema = z.object({
  title_en: z
    .string()
    .trim()
    .min(1, { message: "Title is required" }),
  title_fr: z
    .string()
    .trim()
    .min(1, { message: "Title is required" }),
  title_rw: z
    .string()
    .trim()
    .min(1, { message: "Title is required" }),
  description_en: z
    .string()
    .trim()
    .min(1, { message: "Description is required" }),
  description_fr: z
    .string()
    .trim()
    .min(1, { message: "Description is required" }),
  description_rw: z
    .string()
    .trim()
    .min(1, { message: "Description is required" }),
  event_date: z.string().trim().min(1, { message: "Event date title is required" }),
  backgroundImageId: z
    .number()
    .nullable()
});

/**
 * @openapi
 * /recent-events:
 *   post:
 *     tags:
 *       - Recent Events
 *     security:
 *       - Authorization: []
 *     summary: Add a recent event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title_en
 *               - title_fr
 *               - title_rw
 *               - description_en
 *               - description_fr
 *               - description_rw
 *               - event_date
 *             properties:
 *               title_en:
 *                 type: string
 *                 example: "Parish Youth Rally"
 *                 description: "Title of the event in English"
 *               title_fr:
 *                 type: string
 *                 example: "Rassemblement des jeunes de la paroisse"
 *                 description: "Title of the event in French"
 *               title_rw:
 *                 type: string
 *                 example: "Igiterane cy'urubyiruko rwa paruwasi"
 *                 description: "Title of the event in Kinyarwanda"
 *               description_en:
 *                 type: string
 *                 example: "A gathering to engage the parish youth"
 *                 description: "Description of the event in English"
 *               description_fr:
 *                 type: string
 *                 example: "Un événement pour engager les jeunes de la paroisse"
 *                 description: "Description of the event in French"
 *               description_rw:
 *                 type: string
 *                 example: "Igikorwa cyo gukangurira urubyiruko rwa paruwasi kwitabira"
 *                 description: "Description of the event in Kinyarwanda"
 *               event_date:
 *                 type: string
 *                 format: date
 *                 example: "2025-08-15"
 *                 description: "Date of the event (YYYY-MM-DD)"
 *               backgroundImageId:
 *                 type: number
 *                 nullable: true
 *                 example: 105
 *                 description: "Optional background image ID"
 *     responses:
 *       200:
 *         description: Recent Event saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Recent Event  saved successfully"
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid credentials"
 *       422:
 *         description: Validation error
 *       500:
 *         description: Internal Server error
 *
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function postRecentEvent(req: AuthRequest, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const parsedBody = recentEventSchema.safeParse(req.body)
  if (!parsedBody.success) {
    logger.error("Validation error: %o", parsedBody.error.issues);
    logger.error("Validation error: %o", req.body);
    return res.status(422).send({ message: "Validation error" });
  }


  const newRecentEventRepository = AppDataSource.getRepository(RecentEventsEntity)

  try {
    const newRecentEvent = new RecentEventsEntity();
    newRecentEvent.title_en = parsedBody.data.title_en
    newRecentEvent.title_fr = parsedBody.data.title_fr
    newRecentEvent.title_rw = parsedBody.data.title_rw
    newRecentEvent.description_en = parsedBody.data.description_en
    newRecentEvent.description_fr = parsedBody.data.description_fr
    newRecentEvent.description_rw = parsedBody.data.description_rw
    if (parsedBody.data.event_date) {
      newRecentEvent.event_date = new Date(parsedBody.data.event_date)
    }
    newRecentEvent.isActive = true
    if (parsedBody.data.backgroundImageId) {
      const imageRepository = AppDataSource.getRepository(ImageEntity);
      const savedImage = await imageRepository.findOne({ where: { id: parsedBody.data.backgroundImageId } });
      if (savedImage) {
        newRecentEvent.backgroundImage = savedImage
      }
    }
    await newRecentEventRepository.save(newRecentEvent)
    return res.status(201).send({ message: "Recent Event created successfully" });
  } catch (error: any) {
    logger.error("Creating Language failed: %s", error);
    res.status(500).send({ message: "Internal server error" });
  }
}
