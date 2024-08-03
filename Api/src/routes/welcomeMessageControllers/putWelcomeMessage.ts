import { Response } from "express";
import { AuthRequest } from "../../types/express";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { AppDataSource } from "../../database/dataSource";
import { HomePageWelcomeMessageEntity } from "../../entity/HomePageWelcomeMessageEntity";
import { ImageEntity } from "../../entity/ImagesEntity";

export async function PutWelcomeMessage(req: AuthRequest, res: Response) {
    const portalUser = req.user;
    const id = req.params.id
    const welcomeMessage_en = req.body.welcomeMessage_en
    const welcomeMessage_fr = req.body.welcomeMessage_fr
    const welcomeMessage_rw = req.body.welcomeMessage_rw
    const backgroundImageId = req.body.backgroundImageId

    if (!id) {
        return res.status(400).send({ message: "Welcome Message id is not provided!" });
    }

    if (isUndefinedOrNull(portalUser)) {
        return res.status(401).send({ message: "Unauthorized!" });
    }

    const welcomeMessageRepository = AppDataSource.getRepository(HomePageWelcomeMessageEntity)

    try {
        const oldWelcomeMessage = await welcomeMessageRepository.findOne({ where: { id: Number(id) } });
        if (!oldWelcomeMessage) {
            return res.status(404).send({ message: 'no Welcome Message with this does not exist' })
        }

        if (welcomeMessage_en) {
            oldWelcomeMessage.welcomeMessage_en = welcomeMessage_en
        }

        if (welcomeMessage_fr) {
            oldWelcomeMessage.welcomeMessage_fr = welcomeMessage_fr
        }

        if (welcomeMessage_rw) {
            oldWelcomeMessage.welcomeMessage_rw = welcomeMessage_rw
        }

        if (backgroundImageId) {
            const imageRepository = AppDataSource.getRepository(ImageEntity);
            const savedImage = await imageRepository.findOne({ where: { id: backgroundImageId } });
            if (savedImage) {
                oldWelcomeMessage.backgroundImage = savedImage
            }
          }

        await welcomeMessageRepository.save(oldWelcomeMessage)
        return res.status(201).send({ message: 'Welcome Message updated successfully' });
    } catch (error) {
        logger.error("saving image failed: %s", error);
        res.status(500).send({ success: false, message: "Internal server error!" });
    }
};