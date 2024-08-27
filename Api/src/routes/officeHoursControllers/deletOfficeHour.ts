import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { AuthRequest } from "../../types/express";
import { OfficeHoursEntity } from "../../entity/OfficeHoursEntity";

/**
 * @openapi
 * /officeHours/{id}:
 *   delete:
 *     tags:
 *       - OfficeHour
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: integer
 *         description: OfficeHour ID
 *     summary: delete a Mass officeHours
 *     responses:
 *       200:
 *         description: OfficeHour deleted successfully
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
 *                   example: "OfficeHour deleted successfully"
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
export async function deleteOfficeHour(req: AuthRequest, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const officeHoursRepository = AppDataSource.getRepository(OfficeHoursEntity);
  try {
    const id = Number(req.params.id);
    const oldOfficeHour = await officeHoursRepository.findOne({ where: { id } });
    if (oldOfficeHour === null) {
      return res.status(404).send({ message: "OfficeHour does not exist!" });
    }
    await officeHoursRepository.delete(oldOfficeHour.id);
    return res.status(201).send({ message: "OfficeHour deleted successfully!" });
  } catch (error: any) {
    logger.error("Deleting officeHours failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
