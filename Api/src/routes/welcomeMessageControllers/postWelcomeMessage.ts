import { Response } from "express";
import { AuthRequest } from "../../types/express";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { AppDataSource } from "../../database/dataSource";
import { HomePageWelcomeMessageEntity } from "../../entity/HomePageWelcomeMessageEntity";
import { ImageEntity } from "../../entity/ImagesEntity";

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