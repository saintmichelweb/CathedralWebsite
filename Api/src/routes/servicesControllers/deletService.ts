import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { AuthRequest } from "../../types/express";
import { ServiceEntity } from "../../entity/ServiceEntity";

/**
 * @openapi
 * /service/{id}:
 *   delete:
 *     tags:
 *       - Service
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: integer
 *         description: Service ID
 *     summary: delete a Mass service
 *     responses:
 *       200:
 *         description: Service deleted successfully
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
 *                   example: "Service deleted successfully"
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
export async function deleteService(req: AuthRequest, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const serviceRepository = AppDataSource.getRepository(ServiceEntity);
  try {
    const id = Number(req.params.id);
    const oldService = await serviceRepository.findOne({ where: { id } });
    if (oldService === null) {
      return res.status(404).send({ message: "Service does not exist!" });
    }
    await serviceRepository.delete(oldService.id);
    return res.status(201).send({ message: "Service deleted successfully!" });
  } catch (error: any) {
    logger.error("Deleting service failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
