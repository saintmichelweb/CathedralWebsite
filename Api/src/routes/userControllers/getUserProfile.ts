import { Response } from "express";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { AuthRequest } from "../../types/express";


/**
 * @openapi
 * /user/profile:
 *   get:
 *     tags:
 *       - Users
 *     security:
 *       - Authorization: []
 *     summary: Get user profile
 *     responses:
 *       200:
 *         description: user found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "full names"
 *                 email:
 *                   type: number
 *                   example: "stmichelparishkigali@gmail.com"
 *                 phoneNumber:
 *                   type: string
 *                   example: "0780001234"
 *                 status:
 *                   type: string
 *                   example: "Active"
 *                 created_at:
 *                   type: date
 *                   example: "2024-07-06 10:17:54.312552"
 *                 updated_at:
 *                   type: date
 *                   example: "2024-07-06 10:17:54.312552"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Internal Server error
 *
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function GetUserProfile(req: AuthRequest, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  try {
    return res.status(200).send({data: portalUser});
  } catch (error: any) {
    logger.error("Failed to Get User: %s", error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
}
