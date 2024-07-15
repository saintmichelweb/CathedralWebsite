import { Request, Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { z } from "zod";
import { RecentEventsEntity } from "../../entity/RecentEventsEntity";
import { TopNewsAndNoticesEntity } from "../../entity/TopNewsAndNoticesEntity";

const updateTopNewsAndNoticesSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Title is required" }),
  description: z
    .string()
    .trim()
    .min(1, { message: "Description is required" }),
  isActive: z.boolean(),
});

/**
 * @openapi
 * /top-news-and-notices/{id}:
 *   put:
 *     tags:
 *       - Top News And Notices
 *     security:
 *       - Authorization: []
 *     summary: Update a Top News And Notices
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: integer
 *         description: Top News And Notices ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Top News And Notices"
 *                 description: "Top News And Notices title"
 *               description:
 *                 type: string
 *                 example: "description"
 *                 description: "Top News And Notices description"
 *               isActive:
 *                 type: boolean
 *                 example: "false"
 *                 description: "Activation state of the top news and notices"
 *     responses:
 *       200:
 *         description: Top News And Notices saved successfully
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
 *                   example: "Top News And Notices updated successfully."
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
 *         description: Top News And Notices not found! 
 *       422:
 *         description: Validation error!
 *       500:
 *         description: Internal Server error!
 *
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function putTopParishNewsAndNotices(req: Request, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const parsedBody = updateTopNewsAndNoticesSchema.safeParse(req.body);
  if (!parsedBody.success) {
    logger.error("Validation error: %o", parsedBody.error.issues);
    logger.error("Validation error: %o", req.body);
    return res.status(422).send({ message: "Validation error!" });
  }

  const topParishNewsAndNoticesRepository = AppDataSource.getRepository(TopNewsAndNoticesEntity);
  try {
    const id = Number(req.params.id);
    const oldtopParishNewsAndNotices = await topParishNewsAndNoticesRepository.findOne({ where: { id } });
    if (oldtopParishNewsAndNotices === null) {
      return res.status(404).send({ message: "Top News And Notices does not exist!" });
    }

    if (parsedBody.data.title) {
      oldtopParishNewsAndNotices.title = parsedBody.data.title;
    }

    if (parsedBody.data.description) {
      oldtopParishNewsAndNotices.description = parsedBody.data.description;
    }

    if (parsedBody.data.isActive !== null && parsedBody.data.isActive !== undefined) {
      oldtopParishNewsAndNotices.isActive = parsedBody.data.isActive;
    }

    await topParishNewsAndNoticesRepository.save(oldtopParishNewsAndNotices);
    return res.status(201).send({ message: "Top News And Notices updated successfully." });
  } catch (error: any) {
    logger.error("Updating recent event failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
