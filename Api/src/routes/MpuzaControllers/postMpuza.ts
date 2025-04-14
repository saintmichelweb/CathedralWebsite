import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { z } from "zod";
import { AuthRequest } from "../../types/express";
import { ImageEntity } from "../../entity/ImagesEntity";
import { MpuzaEntity } from "../../entity/MpuzaEntity";
import { CommunityEntity } from "../../entity/CommunityEntity";

const mpuzaMiryangoRemezoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "title is required" }),
  leader: z
    .string()
    .trim()
    .min(1, { message: "leader is required" }),
  phone: z
    .string()
    .trim()
    .min(1, { message: "phone is required" }),
  description_en: z
    .string()
    .trim()
    .min(1, { message: "Description (en) is required" }),
  description_fr: z
    .string()
    .trim()
    .min(1, { message: "Description (fr) is required" }),
  description_rw: z
    .string()
    .trim()
    .min(1, { message: "Description (rw) is required" }),
  community: z
    .number()
    .min(1, { message: "community id is required" }),
  backgroundImageId: z
    .number()
    .nullable()
});

/**
 * @openapi
 * /mpuzamiryangoremezo:
 *   post:
 *     tags:
 *       - Mpuza Miryango Remezo
 *     security:
 *       - Authorization: []
 *     summary: Add a MpuzaMiryangoRemezo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "MpuzaMiryangoRemezo"
 *                 description: "MpuzaMiryangoRemezo title"
 *               description:
 *                 type: string
 *                 example: "description"
 *                 description: "MpuzaMiryangoRemezo description"
 *               backgroundImageId:
 *                 type: number
 *                 example: "description"
 *                 description: "MpuzaMiryangoRemezo backgroundImageId"
 *     responses:
 *       200:
 *         description: MpuzaMiryangoRemezo saved successfully
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
 *                   example: "MpuzaMiryangoRemezo  saved successfully"
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
 *       422:
 *         description: Validation error
 *       500:
 *         description: Internal Server error
 *
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function postMpuzaMiryangoRemezo(req: AuthRequest, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const parsedBody = mpuzaMiryangoRemezoSchema.safeParse(req.body)
  if (!parsedBody.success) {
    logger.error("Validation error: %o", parsedBody.error.issues);
    logger.error("Validation error: %o", req.body);
    return res.status(422).send({ message: "Validation error" });
  }


  const newMpuzaMiryangoRemezoRepository = AppDataSource.getRepository(MpuzaEntity)

  try {
    const newMpuzaMiryangoRemezo = new MpuzaEntity();
    newMpuzaMiryangoRemezo.title = parsedBody.data.title
    newMpuzaMiryangoRemezo.leader = parsedBody.data.leader
    newMpuzaMiryangoRemezo.phone = parsedBody.data.phone
    // newMpuzaMiryangoRemezo.title = parsedBody.data.title
    newMpuzaMiryangoRemezo.description_en = parsedBody.data.description_en
    newMpuzaMiryangoRemezo.description_fr = parsedBody.data.description_fr
    newMpuzaMiryangoRemezo.description_rw = parsedBody.data.description_rw
    if (parsedBody.data.community) {
      const communityRepository = AppDataSource.getRepository(CommunityEntity);
      const savedCommunity = await communityRepository.findOne({ where: { id: parsedBody.data.community } });
      if (savedCommunity) {
        newMpuzaMiryangoRemezo.community = savedCommunity
      }
    }
    if (parsedBody.data.backgroundImageId) {
      const imageRepository = AppDataSource.getRepository(ImageEntity);
      const savedImage = await imageRepository.findOne({ where: { id: parsedBody.data.backgroundImageId } });
      if (savedImage) {
        newMpuzaMiryangoRemezo.backgroundImage = savedImage
      }
    }
    await newMpuzaMiryangoRemezoRepository.save(newMpuzaMiryangoRemezo)
    return res.status(201).send({ message: "MpuzaMiryangoRemezo details added successfully" });
  } catch (error: any) {
    logger.error("Creating MpuzaMiryangoRemezo failed: %s", error);
    res.status(500).send({ message: "Internal server error" });
  }
}
