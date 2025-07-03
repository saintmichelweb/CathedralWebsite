import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { AuthRequest } from "../../types/express";
import { MuryangoremezoEntity } from "../../entity/MuryangoremezoEntity";
import * as fs from 'fs'

/**
 * @openapi
 * /miryangoremezo/{id}:
 *   delete:
 *     tags:
 *       - Muryango Remezo
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: integer
 *         description: MuryangoRemezo ID
 *     summary: delete a muryangoremezo
 *     responses:
 *       200:
 *         description: MuryangoRemezo deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "MuryangoRemezo deleted successfully"
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
export async function deleteMuryangoRemezo(req: AuthRequest, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const muryangoremezoRepository = AppDataSource.getRepository(MuryangoremezoEntity);
  try {
    const id = Number(req.params.id);
    const oldMuryangoRemezo = await muryangoremezoRepository.findOne({ where: { id } });

    if (oldMuryangoRemezo === null) {
      return res.status(404).send({ message: "MuryangoRemezo does not exist!" });
    }

    // if (oldMuryangoRemezo.backgroundImage) {
    //   fs.unlinkSync(oldMuryangoRemezo.backgroundImage.imagePath);
    // }

    await muryangoremezoRepository.delete(oldMuryangoRemezo.id);
    return res.status(201).send({ message: "MuryangoRemezo deleted successfully!" });
  } catch (error: any) {
    logger.error("Deleting muryangoremezo failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
