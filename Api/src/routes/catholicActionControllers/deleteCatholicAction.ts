import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { AuthRequest } from "../../types/express";
import { CatholicActionEntity } from "../../entity/CatholicActionEntity";
import * as fs from 'fs'

/**
 * @openapi
 * /catholic-actions/{id}:
 *   delete:
 *     tags:
 *       - Catholic Actions
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: integer
 *         description: Catholic Actions ID
 *     summary: delete a Mass Catholic Actions
 *     responses:
 *       200:
 *         description: Catholic Actions deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Catholic Actions deleted successfully"
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
 *       500:
 *         description: Internal Server error
 *
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function deleteCatholicAction(req: AuthRequest, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const catholicActionsRepository = AppDataSource.getRepository(CatholicActionEntity);
  try {
    const id = Number(req.params.id);
    const oldChoir = await catholicActionsRepository.findOne({ where: { id } });

    if (oldChoir === null) {
      return res.status(404).send({ message: "Catholic Actions does not exist!" });
    }

    if (oldChoir.backgroundImage) {
      fs.unlinkSync(oldChoir.backgroundImage.imagePath);
    }

    await catholicActionsRepository.delete(oldChoir.id);
    return res.status(201).send({ message: "Catholic Action deleted successfully!" });
  } catch (error: any) {
    logger.error("Deleting Catholic Action failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
