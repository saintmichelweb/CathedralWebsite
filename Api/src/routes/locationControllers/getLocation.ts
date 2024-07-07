import { Request, Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { LocationEntity } from "../../entity/LocationEntity";

/**
 * @openapi
 * /location/:id:
 *   delete:
 *     tags:
 *       - Location
 *     security:
 *       - Authorization: []
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
export async function deleteLocation(req: Request, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const massLocationRepository = AppDataSource.getRepository(LocationEntity);
  try {
    const id = Number(req.params.id);
    const oldLocation = await massLocationRepository.findOne({ where: { id } });
    if (oldLocation === null) {
      return res.status(404).send({ message: "Location does not exist!" });
    }
    await massLocationRepository.delete(oldLocation);
    return res.status(201).send({ message: "Location deleted successfully!" });
  } catch (error: any) {
    logger.error("Updating location failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
