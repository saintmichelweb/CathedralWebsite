import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { AuthRequest } from "../../types/express";
import { ChoirEntity } from "../../entity/ChoirEntity";
import * as fs from 'fs'

/**
 * @openapi
 * /Choir/{id}:
 *   delete:
 *     tags:
 *       - Choir
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: integer
 *         description: Choir ID
 *     summary: delete a Mass Choir
 *     responses:
 *       200:
 *         description: Choir deleted successfully
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
 *                   example: "Choir deleted successfully"
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
export async function deleteChoir(req: AuthRequest, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const ChoirRepository = AppDataSource.getRepository(ChoirEntity);
  try {
    const id = Number(req.params.id);
    const oldChoir = await ChoirRepository.findOne({ where: { id } });

    if (oldChoir === null) {
      return res.status(404).send({ message: "Choir does not exist!" });
    }

    if (oldChoir.backgroundImage) {
      fs.unlinkSync(oldChoir.backgroundImage.imagePath);
    }

    await ChoirRepository.delete(oldChoir.id);
    return res.status(201).send({ message: "Choir deleted successfully!" });
  } catch (error: any) {
    logger.error("Deleting Choir failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
