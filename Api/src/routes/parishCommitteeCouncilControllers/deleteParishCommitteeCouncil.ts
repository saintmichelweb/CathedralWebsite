import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { AuthRequest } from "../../types/express";
import { ParishComitteCouncilEntity } from "../../entity/ParishComitteCouncilEntity";

/**
 * @openapi
 * /parishCommitteeCouncil/{id}:
 *   delete:
 *     tags:
 *       - parishCommitteeCouncil
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: integer
 *         description: parishCommitteeCouncil ID
 *     summary: delete a Mass parishCommitteeCouncil
 *     responses:
 *       200:
 *         description: parishCommitteeCouncil deleted successfully
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
 *                   example: "parishCommitteeCouncil deleted successfully"
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
export async function deleteparishCommitteeCouncil(req: AuthRequest, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const parishCommitteeCouncilRepository = AppDataSource.getRepository(ParishComitteCouncilEntity);
  try {
    const id = Number(req.params.id);
    const oldParishComitteCouncil = await parishCommitteeCouncilRepository.findOne({ where: { id } });
    if (oldParishComitteCouncil === null) {
      return res.status(404).send({ message: "parishCommitteeCouncil does not exist!" });
    }
    await parishCommitteeCouncilRepository.delete(oldParishComitteCouncil.id);
    return res.status(201).send({ message: "parishCommitteeCouncil deleted successfully!" });
  } catch (error: any) {
    logger.error("Deleting parishCommitteeCouncil failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
