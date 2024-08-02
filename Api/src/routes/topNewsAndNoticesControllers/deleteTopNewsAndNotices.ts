import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { AuthRequest } from "../../types/express";
import { TopNewsAndNoticesEntity } from "../../entity/TopNewsAndNoticesEntity";

/**
 * @openapi
 * /top-news-and-notices/{id}:
 *   delete:
 *     tags:
 *       - Top News And Notices
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: integer
 *         description: Top News And Notices ID
 *     summary: delete a Mass location
 *     responses:
 *       200:
 *         description: Top News And Notices deleted successfully
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
 *                   example: "Top News And Notices deleted successfully"
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
 *       500:
 *         description: Internal Server error
 *
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function deleteTopNewsAndNoticesEntity(req: AuthRequest, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const topNewsAndNoticesRepository = AppDataSource.getRepository(TopNewsAndNoticesEntity);
  try {
    const id = Number(req.params.id);
    const oldTopNewsAndNotice = await topNewsAndNoticesRepository.findOne({ where: { id } });
    if (oldTopNewsAndNotice === null) {
      return res.status(404).send({ message: "Top News And Notices does not exist!" });
    }
    await topNewsAndNoticesRepository.delete(oldTopNewsAndNotice.id);
    return res.status(201).send({ message: "Top News And Notices deleted successfully!" });
  } catch (error: any) {
    logger.error("Deleting Top News And Notices failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
