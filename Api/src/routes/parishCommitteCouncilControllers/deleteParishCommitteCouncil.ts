import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { AuthRequest } from "../../types/express";
import { ParishComitteCouncilEntity } from "../../entity/ParishComitteCouncilEntity";

/**
 * @openapi
 * /parishCommitteCouncil/{id}:
 *   delete:
 *     tags:
 *       - ParishCommitteCouncil
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: integer
 *         description: parishCommitteCouncil ID
 *     summary: delete a Mass parishCommitteCouncil
 *     responses:
 *       200:
 *         description: parishCommitteCouncil deleted successfully
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
 *                   example: "parishCommitteCouncil deleted successfully"
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
export async function deleteParishCommitteCouncil(req: AuthRequest, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const parishCommitteCouncilRepository = AppDataSource.getRepository(ParishComitteCouncilEntity);
  try {
    const id = Number(req.params.id);
    const oldParishComitteCouncil = await parishCommitteCouncilRepository.findOne({ where: { id } });
    if (oldParishComitteCouncil === null) {
      return res.status(404).send({ message: "parishCommitteCouncil does not exist!" });
    }
    await parishCommitteCouncilRepository.delete(oldParishComitteCouncil.id);
    return res.status(201).send({ message: "parishCommitteCouncil deleted successfully!" });
  } catch (error: any) {
    logger.error("Deleting parishCommitteCouncil failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
