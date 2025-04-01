import { Response } from "express";
import { AuthRequest } from "../../types/express";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { readEnv } from "../../setup/readEnv";
import { ImageEntity } from "../../entity/ImagesEntity";
import { AppDataSource } from "../../database/dataSource";

export async function ImageUpload(req: AuthRequest, res: Response) {
  const APP_URL: string = readEnv("APP_URL", '') as string;
  const uploadedFile: Express.Multer.File | undefined = req.file;
  const portalUser = req.user;
  const isBannerImage = req.body.isBannerImage
  const bannerDescription_en = req.body.bannerDescription_en
  const bannerDescription_fr = req.body.bannerDescription_fr
  const bannerDescription_rw = req.body.bannerDescription_rw

  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  if (!uploadedFile) {
    return res.status(400).json({ message: 'No image uploaded' });
  }

  const imageRepository = AppDataSource.getRepository(ImageEntity)
  try {
    const newImage = new ImageEntity();
    newImage.imageUrl = `${APP_URL}/api/image/${uploadedFile.filename}`
    newImage.imagePath = uploadedFile.path
    if (isBannerImage) {
      newImage.isBannerImage = isBannerImage === 'true' 
    }
    if (bannerDescription_en) {
      newImage.bannerDescription_en = bannerDescription_en
      newImage.bannerDescription_fr = bannerDescription_fr
      newImage.bannerDescription_rw = bannerDescription_rw
    }
    newImage.filename = uploadedFile.filename
    newImage.isActive = true
    const savedImage = await imageRepository.save(newImage)
    return res.status(201).send({ message: 'Image uploaded successfully', image: savedImage });
  } catch (error) {
    logger.error("saving image failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
};