import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { AuthRequest } from "../../types/express";
import { PriestsEntity } from "../../entity/PriestsEntity";

/**
 * @openapi
 * /priests/{id}:
 *   delete:
 *     tags:
 *       - Priests
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: integer
 *         description: Priests ID
 *     summary: delete a Mass priests
 *     responses:
 *       200:
 *         description: Priests deleted successfully
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
 *                   example: "Priests deleted successfully"
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
export async function deletePriest(req: AuthRequest, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const priestRepository = AppDataSource.getRepository(PriestsEntity);
  try {
    const id = Number(req.params.id);
    const oldPriests = await priestRepository.findOne({ where: { id } });

    if (oldPriests === null) {
      return res.status(404).send({ message: "Priest does not exist!" });
    }

    await priestRepository.delete(oldPriests.id);
    return res.status(201).send({ message: "Priest deleted successfully!" });
  } catch (error: any) {
    logger.error("Deleting priest failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
