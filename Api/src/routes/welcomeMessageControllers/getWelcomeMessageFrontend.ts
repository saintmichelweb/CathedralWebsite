import { Request, Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { HomePageWelcomeMessageEntity } from "../../entity/HomePageWelcomeMessageEntity";

/**
 * @openapi
 * /WelcomeMessageFrontend/msg:
 *   get:
 *     tags:
 *       - Welcome Message
 *     summary: Get welcome message
 *     responses:
 *       200:
 *         description: Get welcome message
 *       500:
 *         description: Internal server error
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function getWelcomeMessageFrontend(req: Request, res: Response) {
  const welcomeMessageRepository = AppDataSource.getRepository(HomePageWelcomeMessageEntity);
  const welcomMessageQueryBuilder = welcomeMessageRepository.createQueryBuilder('welcome_message')
    .leftJoinAndSelect('welcome_message.backgroundImage', 'backgroundImage');

  try {
    const welcomeMessages = await welcomMessageQueryBuilder.getMany();
    return res.status(200).send({ message: "Welcome Message retrieved successfully!", welcomeMessage: welcomeMessages });
  } catch (error: any) {
    logger.error("Get Welcome Message failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
