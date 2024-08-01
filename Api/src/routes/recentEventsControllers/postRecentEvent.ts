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
  backgroungImageId: z
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
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Recent event"
 *                 description: "Recent event title"
 *               description:
 *                 type: string
 *                 example: "description"
 *                 description: "Recent event description"
 *               backgroungImageId:
 *                 type: number
 *                 example: "description"
 *                 description: "Recent event backgroungImageId"
 *     responses:
 *       200:
 *         description: Recent Event saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
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
 *                 success:
 *                   type: boolean
 *                   example: false
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
    if (parsedBody.data.backgroungImageId) {
      const imageRepository = AppDataSource.getRepository(ImageEntity);
      const savedImage = await imageRepository.findOne({ where: { id: parsedBody.data.backgroungImageId } });
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
