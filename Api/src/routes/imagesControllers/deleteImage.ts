import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { ImageEntity } from "../../entity/ImagesEntity";
import { AuthRequest } from "../../types/express";
import * as fs from 'fs'


/**
 * @openapi
 * /image/{id}:
 *   delete:
 *     tags:
 *       - Images
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: integer
 *         description: Image ID
 *     summary: delete an Image
 *     responses:
 *       200:
 *         description: Image deleted successfully
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
 *                   example: "Image deleted successfully"
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
export async function deleteImages(req: AuthRequest, res: Response) {
    let portalUser = req.user;
    if (isUndefinedOrNull(portalUser)) {
        return res.status(401).send({ message: "Unauthorized!" });
    }

    const imageRepository = AppDataSource.getRepository(ImageEntity);
    try {
        const id = Number(req.params.id);
        const oldImage = await imageRepository.findOne({ where: { id } });
        if (oldImage === null) {
            return res.status(404).send({ message: "Image does not exist!" });
        }

        fs.unlinkSync(oldImage.imagePath);
        console.log('File deleted successfully.');

        await imageRepository.delete(oldImage.id);
        return res.status(201).send({ message: "Image deleted successfully!" });
    } catch (error: any) {
        logger.error("Deleting image failed: %s", error);
        res.status(500).send({ success: false, message: "Internal server error!" });
    }
}
