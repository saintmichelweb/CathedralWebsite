import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { AuthRequest } from "../../types/express";
import { MpuzaEntity } from "../../entity/MpuzaEntity";
import * as fs from 'fs'

/**
 * @openapi
 * /mpuzamiryangoremezo/{id}:
 *   delete:
 *     tags:
 *       - Mpuza Miryango Remezo
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: integer
 *         description: MpuzaMiryangoRemezo ID
 *     summary: delete a Mass commission
 *     responses:
 *       200:
 *         description: MpuzaMiryangoRemezo deleted successfully
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
 *                   example: "MpuzaMiryangoRemezo deleted successfully"
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
export async function deleteMpuzaMiryangoRemezo(req: AuthRequest, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const commissionRepository = AppDataSource.getRepository(MpuzaEntity);
  try {
    const id = Number(req.params.id);
    const oldMpuzaMiryangoRemezo = await commissionRepository.findOne({ where: { id } });

    if (oldMpuzaMiryangoRemezo === null) {
      return res.status(404).send({ message: "MpuzaMiryangoRemezo does not exist!" });
    }

    if (oldMpuzaMiryangoRemezo.backgroundImage) {
      fs.unlinkSync(oldMpuzaMiryangoRemezo.backgroundImage.imagePath);
    }

    await commissionRepository.delete(oldMpuzaMiryangoRemezo.id);
    return res.status(201).send({ message: "MpuzaMiryangoRemezo deleted successfully!" });
  } catch (error: any) {
    logger.error("Deleting commission failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
