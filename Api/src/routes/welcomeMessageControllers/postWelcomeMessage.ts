import { Response } from "express";
import { AuthRequest } from "../../types/express";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { AppDataSource } from "../../database/dataSource";
import { HomePageWelcomeMessageEntity } from "../../entity/HomePageWelcomeMessageEntity";
import { ImageEntity } from "../../entity/ImagesEntity";

/**
 * @openapi
 * /welcomeMessage:
 *   post:
 *     tags:
 *       - Welcome Message
 *     security:
 *       - Authorization: []
 *     summary: get welcome Message
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object 
 *             required:
 *               - welcomeMessage_en
 *               - welcomeMessage_fr
 *               - welcomeMessage_rw
 *             properties:
 *               welcomeMessage_en:
 *                 type: string
 *                 example: "We are happy to have you with us at St. Michel Parish."
 *                 description: "Welcome message in English"
 *               welcomeMessage_fr:
 *                 type: string
 *                 example: "Nous sommes heureux de vous accueillir à la paroisse Saint Michel."
 *                 description: "Welcome message in French"
 *               welcomeMessage_rw:
 *                 type: string
 *                 example: "Turishimye kubakira muri Paruwasi ya Mutagatifu Mikaheli."
 *                 description: "Welcome message in Kinyarwanda"
 *               backgroundImageId:
 *                 type: number
 *                 nullable: true
 *                 example: 106
 *                 description: "Optional background image ID"
 *     responses:
 *       200:
 *         description: Service saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Service saved successfully"
 *       422:
 *         description: Validation error
 *       400:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid credentials"
 *
 */
export async function PostWelcomeMessage(req: AuthRequest, res: Response) {
  const portalUser = req.user;
  const welcomeMessage_en = req.body.welcomeMessage_en
  const welcomeMessage_fr = req.body.welcomeMessage_fr
  const welcomeMessage_rw = req.body.welcomeMessage_rw
  const backgroundImageId = req.body.backgroundImageId
  
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const welcomeMessageRepository = AppDataSource.getRepository(HomePageWelcomeMessageEntity)
  try {
    const newWelcomeMessage = new HomePageWelcomeMessageEntity();

    if (welcomeMessage_en) {
      newWelcomeMessage.welcomeMessage_en = welcomeMessage_en
      newWelcomeMessage.welcomeMessage_fr = welcomeMessage_fr
      newWelcomeMessage.welcomeMessage_rw = welcomeMessage_rw
    }

    if (backgroundImageId) {
      const imageRepository = AppDataSource.getRepository(ImageEntity);
      const savedImage = await imageRepository.findOne({ where: { id: backgroundImageId } });
      if (savedImage) {
        newWelcomeMessage.backgroundImage = savedImage
      }
    }
  
    welcomeMessageRepository.save(newWelcomeMessage)
    return res.status(201).send({ message: 'Welcome Message uploaded successfully' });
  } catch (error) {
    logger.error("saving image failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
};