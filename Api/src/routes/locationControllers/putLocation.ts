import { Request, Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { z } from "zod";
import { LocationEntity } from "../../entity/LocationEntity";

const LocationSchema = z.object({
  location: z.string().trim().min(1, { message: 'Location is required!' }),
  isActive: z.boolean(),
});

/**
 * @openapi
 * /location/:id:
 *   put:
 *     tags:
 *       - Location
 *     security:
 *       - Authorization: []
 *     summary: Update a new Mass location
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               location:
 *                 type: string
 *                 example: "St Michael Parish"
 *                 description: "location of the Mass"
 *               isActive:
 *                 type: boolean
 *                 example: "false"
 *                 description: "Activation state of the location"
 *     responses:
 *       200:
 *         description: Location saved successfully
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
 *                   example: "Location updated successfully."
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
 *         description: Location not found! 
 *       422:
 *         description: Validation error!
 *       500:
 *         description: Internal Server error!
 *
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function putLocation(req: Request, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const parsedBody = LocationSchema.safeParse(req.body);
  if (!parsedBody.success) {
    logger.error("Validation error: %o", parsedBody.error.issues);
    logger.error("Validation error: %o", req.body);
    return res.status(422).send({ message: "Validation error!" });
  }

  const locationRepository = AppDataSource.getRepository(LocationEntity);
  try {
    const id = Number(req.params.id);
    const oldLocation = await locationRepository.findOne({ where: { id } });
    if (oldLocation === null) {
      return res.status(404).send({ message: "Location does not exist!" });
    }
    if (parsedBody.data.location) {
      oldLocation.location = parsedBody.data.location;
    }

    if (parsedBody.data.isActive !== null && parsedBody.data.isActive !== undefined) {
      oldLocation.isActive = parsedBody.data.isActive;
    }

    await locationRepository.save(oldLocation);
    return res.status(201).send({ message: "Location updated successfully." });
  } catch (error: any) {
    logger.error("Updating location failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
