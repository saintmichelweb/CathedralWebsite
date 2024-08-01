import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { z } from "zod";
import { AuthRequest } from "../../types/express";
import { TopNewsAndNoticesEntity } from "../../entity/TopNewsAndNoticesEntity";

const topNewsAndNoticesSchema = z.object({
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
});

/**
 * @openapi
 * /top-news-and-notices:
 *   post:
 *     tags:
 *       - Top News And Notices
 *     security:
 *       - Authorization: []
  *     summary: Add a top news and notices
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
export async function postTopParishNewsAndNotices(req: AuthRequest, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const parsedBody = topNewsAndNoticesSchema.safeParse(req.body)
    if (!parsedBody.success) {
      logger.error("Validation error: %o", parsedBody.error.issues);
      logger.error("Validation error: %o", req.body);
      return res.status(422).send({ message: "Validation error" });
    }

  const newTopNewsAndNoticesRepository = AppDataSource.getRepository(TopNewsAndNoticesEntity)
  try {
    const newTopNewsAndNotices = new TopNewsAndNoticesEntity();
    newTopNewsAndNotices.title_en = parsedBody.data.title_en
    newTopNewsAndNotices.title_fr = parsedBody.data.title_fr
    newTopNewsAndNotices.title_rw = parsedBody.data.title_rw
    newTopNewsAndNotices.description_en = parsedBody.data.description_en
    newTopNewsAndNotices.description_fr = parsedBody.data.description_fr
    newTopNewsAndNotices.description_rw = parsedBody.data.description_rw
    newTopNewsAndNotices.isActive = true
    await newTopNewsAndNoticesRepository.save(newTopNewsAndNotices)
    return res.status(201).send({ message: "Top parish news and notice created successfully" });
  } catch (error: any) {
    logger.error("Creating Language failed: %s", error);
    res.status(500).send({ message: "Internal server error" });
  }
}
