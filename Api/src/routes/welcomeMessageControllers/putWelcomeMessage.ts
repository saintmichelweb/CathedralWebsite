import { Response } from "express";
import { AuthRequest } from "../../types/express";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { AppDataSource } from "../../database/dataSource";
import { HomePageWelcomeMessageEntity } from "../../entity/HomePageWelcomeMessageEntity";
import { ImageEntity } from "../../entity/ImagesEntity";

/**
 * @openapi
 * /welcomeMessage/{id}:
 *   put:
 *     tags:
 *       - Welcome Message
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: integer
 *         description: Welcome Message ID
 *     summary: Update a Welcome Message
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
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Service updated successfully."
 *       401:
 *         description: Invalid credentials!
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
 *                   example: "Invalid credentials!"
 *       404:
 *         description: Service not found! 
 *       422:
 *         description: Validation error!
 *       500:
 *         description: Internal Server error!
 *
 */

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