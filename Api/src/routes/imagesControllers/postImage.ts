import { Response } from "express";
import { AuthRequest } from "../../types/express";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { readEnv } from "../../setup/readEnv";
import { ImageEntity } from "../../entity/ImagesEntity";
import { AppDataSource } from "../../database/dataSource";

export async function ImageUpload(req: AuthRequest, res: Response) {
  const PORT: number = readEnv("PORT", 3000, true) as number;
  const uploadedFile: Express.Multer.File | undefined = req.file;
  const portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  if (!uploadedFile) {
    return res.status(400).json({ message: 'No image uploaded' });
  }

  const imageRepository = AppDataSource.getRepository(ImageEntity)
  try {
    const newImage = new ImageEntity();
    newImage.imageUrl = `http://localhost:${PORT}/api/image/${uploadedFile.filename}`
    newImage.isActive = true
    newImage.imagePath = uploadedFile.path
    const savedImage = await imageRepository.save(newImage)
    return res.status(201).send({ message: 'Image uploaded successfully',  image: savedImage});
  } catch (error) {
    logger.error("Getting location failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
};