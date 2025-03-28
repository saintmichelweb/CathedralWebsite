import { Request, Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { z } from "zod";
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
  isActive: z.boolean(),
  event_date: z.string().trim().min(1, { message: "Event date title is required" }),
  backgroundImageId: z
  .number()
  .nullable()
});

/**
 * @openapi
 * /recent-events/{id}:
 *   put:
 *     tags:
 *       - Recent Events
 *     security:
 *       - Authorization: []
 *     summary: Update a recent event
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: integer
 *         description: Recent Event ID
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
 *               isActive:
 *                 type: boolean
 *                 example: "false"
 *                 description: "Activation state of the recent event"
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
 *                   example: "Recent Event updated successfully."
 *       401:
 *         description: Invalid credentials!
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
 *                   example: "Invalid credentials!"
 *       404:
 *         description: Recent Event not found! 
 *       422:
 *         description: Validation error!
 *       500:
 *         description: Internal Server error!
 *
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function putRecentEvent(req: Request, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const parsedBody = recentEventSchema.safeParse(req.body);
  if (!parsedBody.success) {
    logger.error("Validation error: %o", parsedBody.error.issues);
    logger.error("Validation error: %o", req.body);
    return res.status(422).send({ message: "Validation error!" });
  }

  const recentEventRepository = AppDataSource.getRepository(RecentEventsEntity);
  try {
    const id = Number(req.params.id);
    const oldRecentEvent = await recentEventRepository.findOne({ where: { id } });
    if (oldRecentEvent === null) {
      return res.status(404).send({ message: "Recent Event does not exist!" });
    }

    if (parsedBody.data.title_en) {
      oldRecentEvent.title_en = parsedBody.data.title_en;
    }

    if (parsedBody.data.title_fr) {
      oldRecentEvent.title_fr = parsedBody.data.title_fr;
    }

    if (parsedBody.data.title_rw) {
      oldRecentEvent.title_rw = parsedBody.data.title_rw;
    }

    if (parsedBody.data.description_en) {
      oldRecentEvent.description_en = parsedBody.data.description_en;
    }

    if (parsedBody.data.description_fr) {
      oldRecentEvent.description_fr = parsedBody.data.description_fr;
    }

    if (parsedBody.data.description_rw) {
      oldRecentEvent.description_rw = parsedBody.data.description_rw;
    }
    
    if (parsedBody.data.event_date) {
      oldRecentEvent.event_date = new Date(parsedBody.data.event_date);
    }

    if (parsedBody.data.isActive !== null && parsedBody.data.isActive !== undefined) {
      oldRecentEvent.isActive = parsedBody.data.isActive;
    }

    if (parsedBody.data.backgroundImageId) {
      const imageRepository = AppDataSource.getRepository(ImageEntity);
      const savedImage = await imageRepository.findOne({ where: { id: parsedBody.data.backgroundImageId } });
      if (savedImage){
        oldRecentEvent.backgroundImage = savedImage
      } 
    }

    await recentEventRepository.save(oldRecentEvent);
    return res.status(201).send({ message: "Recent Event updated successfully." });
  } catch (error: any) {
    logger.error("Updating recent event failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
