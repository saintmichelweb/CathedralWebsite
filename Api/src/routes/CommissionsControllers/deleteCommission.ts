import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { AuthRequest } from "../../types/express";
import { CommissionEntity } from "../../entity/CommissionEntity";
import * as fs from 'fs'

/**
 * @openapi
 * /commission/{id}:
 *   delete:
 *     tags:
 *       - Commission
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: integer
 *         description: Commission ID
 *     summary: delete a Mass commission
 *     responses:
 *       200:
 *         description: Commission deleted successfully
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
 *                   example: "Commission deleted successfully"
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
export async function deleteCommission(req: AuthRequest, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const commissionRepository = AppDataSource.getRepository(CommissionEntity);
  try {
    const id = Number(req.params.id);
    const oldCommission = await commissionRepository.findOne({ where: { id } });

    if (oldCommission === null) {
      return res.status(404).send({ message: "Commission does not exist!" });
    }

    if (oldCommission.backgroundImage) {
      fs.unlinkSync(oldCommission.backgroundImage.imagePath);
    }

    await commissionRepository.delete(oldCommission.id);
    return res.status(201).send({ message: "Commission deleted successfully!" });
  } catch (error: any) {
    logger.error("Deleting commission failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
