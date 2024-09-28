import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { AuthRequest } from "../../types/express";
import * as fs from 'fs'
import { PortalUserEntity } from "../../entity/PortalUserEntity";

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: integer
 *         description: Users ID
 *     summary: delete a Mass users
 *     responses:
 *       200:
 *         description: Users deleted successfully
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
 *                   example: "Users deleted successfully"
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
export async function deleteUser(req: AuthRequest, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const userRepository = AppDataSource.getRepository(PortalUserEntity);
  try {
    const id = Number(req.params.id);
    const oldUsers = await userRepository.findOne({ where: { id } });

    if (oldUsers === null) {
      return res.status(404).send({ message: "User does not exist!" });
    }

    // if (oldUsers.backgroundImage) {
    //   fs.unlinkSync(oldUsers.backgroundImage.imagePath);
    // }

    await userRepository.delete(oldUsers.id);
    return res.status(201).send({ message: "User deleted successfully!" });
  } catch (error: any) {
    logger.error("Deleting user failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
