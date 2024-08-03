import { Request, Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { HomePageWelcomeMessageEntity } from "../../entity/HomePageWelcomeMessageEntity";

/**
 * @openapi
 * /welcomeMessage:
 *   get:
 *     tags:
 *       - Welcome Message
 *     security:
 *       - Authorization: []
 *     summary: get welcome Message
 *     responses:
 *       200:
 *         description: Get welcome Message
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid credentials"
 *       500:
 *         description: Internal Server error
 *
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function getWelcomeMessage(req: Request, res: Response) {
  let portalUser = req.user;

  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

const welcomeMessageRepository = AppDataSource.getRepository(HomePageWelcomeMessageEntity)
const welcomMessageQueueryBuilder = welcomeMessageRepository.createQueryBuilder('welcome_message')
.leftJoinAndSelect('welcome_message.backgroundImage', 'backgoundImage')

  try {
    const welcomeMessages = await welcomMessageQueueryBuilder.getMany()
    return res.status(200).send({ message: "Welcome Message retrieved successfully!", welcomeMessage: welcomeMessages });
  } catch (error: any) {
    logger.error("Get Welcome Message failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
