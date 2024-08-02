import { Response } from "express";
import { AuthRequest } from "../../types/express";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { readEnv } from "../../setup/readEnv";
import { ImageEntity } from "../../entity/ImagesEntity";
import { AppDataSource } from "../../database/dataSource";

export async function ImageUpdate(req: AuthRequest, res: Response) {
    const PORT: number = readEnv("PORT", 3000, true) as number;
    // const uploadedFile: Express.Multer.File | undefined = req.file;
    const portalUser = req.user;
    const id = req.params.id
    const isBannerImage = req.body.isBannerImage
    const isActive = req.body.isActive
    const bannerDescription_en = req.body.bannerDescription_en
    const bannerDescription_fr = req.body.bannerDescription_fr
    const bannerDescription_rw = req.body.bannerDescription_rw

    if (!id) {
        return res.status(400).send({ message: "Image id is not provided!" });
    }

    if (isUndefinedOrNull(portalUser)) {
        return res.status(401).send({ message: "Unauthorized!" });
    }

    // if (!uploadedFile) {
    //     return res.status(400).json({ message: 'No image uploaded' });
    // }
    console.log('req. body ', req.body)

    const imageRepository = AppDataSource.getRepository(ImageEntity)

    try {
        const oldImage = await imageRepository.findOne({ where: { id: Number(id) } });
        if (!oldImage) {
            return res.status(404).send({ message: 'no Image with this does not exist' })
        }

        if (isBannerImage !== null && isBannerImage !== undefined) {
            oldImage.isBannerImage = isBannerImage
        }

        if (bannerDescription_en) {
            oldImage.bannerDescription_en = bannerDescription_en
        }

        if (bannerDescription_fr) {
            oldImage.bannerDescription_fr = bannerDescription_fr
        }

        if (bannerDescription_rw) {
            oldImage.bannerDescription_rw = bannerDescription_rw
        }

        if (isActive !== null && isActive !== undefined) {
            oldImage.isActive = isActive
        }

        await imageRepository.save(oldImage)
        return res.status(201).send({ message: 'Image updated successfully' });
    } catch (error) {
        logger.error("saving image failed: %s", error);
        res.status(500).send({ success: false, message: "Internal server error!" });
    }
};