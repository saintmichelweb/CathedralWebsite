import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { z } from "zod";
import { LocationEntity } from "../../entity/LocationEntity";
import { AuthRequest } from "../../types/express";

const massLocationSchema = z.object({
  location: z
    .string()
    .trim()
    .min(1, { message: "Location Name is required" }),
});

/**
 * @openapi
 * /location:
 *   post:
 *     tags:
 *       - Location
 *     security:
 *       - Authorization: []
 *     summary: Add a new Mass location
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
 *                   example: "Location saved successfully"
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
 *       422:
 *         description: Validation error
 *       500:
 *         description: Internal Server error
 *
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function postLocation(req: AuthRequest, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const parsedBody = massLocationSchema.safeParse(req.body)
    if (!parsedBody.success) {
      logger.error("Validation error: %o", parsedBody.error.issues);
      logger.error("Validation error: %o", req.body);
      return res.status(422).send({ message: "Validation error" });
    }

  const locationRepository = AppDataSource.getRepository(LocationEntity)
  try {
    const newLocation = new LocationEntity();
    newLocation.location = parsedBody.data.location
    newLocation.isActive = true
    await locationRepository.save(newLocation)
    return res.status(201).send({ message: "Location created successfully" });
  } catch (error: any) {
    logger.error("Getting home page failed with error: %s", error);
    res.status(400).send({ success: false, message: error.message });
  }
}
