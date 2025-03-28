import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { LocationEntity } from "../../entity/LocationEntity";
import { AuthRequest } from "../../types/express";

/**
 * @openapi
 * /location/{id}:
 *   delete:
 *     tags:
 *       - Location
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: integer
 *         description: Location ID
 *     summary: delete a Mass location
 *     responses:
 *       200:
 *         description: Location deleted successfully
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
 *                   example: "Location deleted successfully"
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
export async function deleteLocation(req: AuthRequest, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const locationRepository = AppDataSource.getRepository(LocationEntity);
  try {
    const id = Number(req.params.id);
    const oldLocation = await locationRepository.findOne({ where: { id } });
    if (oldLocation === null) {
      return res.status(404).send({ message: "Location does not exist!" });
    }
    await locationRepository.delete(oldLocation.id);
    return res.status(201).send({ message: "Location deleted successfully!" });
  } catch (error: any) {
    logger.error("Deleting location failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
