import { Response } from "express";
import { AuthRequest } from "../../types/express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { z } from "zod";
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
 * /mpuzamiryangoremezo/{id}:
 *   put:
 *     tags:
 *       - Mpuza
 *     security:
 *       - Authorization: []
 *     summary: Update a mpuzaMiryangoRemezo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: integer
 *         description: mpuzaMiryangoRemezo ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "mpuzaMiryangoRemezo"
 *                 description: "mpuzaMiryangoRemezo title"
 *               description:
 *                 type: string
 *                 example: "description"
 *                 description: "mpuzaMiryangoRemezo description"
 *               backgroundImageId:
 *                 type: number
 *                 example: 1
 *                 description: "Id of the saved image entity"
 *     responses:
 *       200:
 *         description: mpuzaMiryangoRemezo saved successfully
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
 *                   example: "mpuzaMiryangoRemezo updated successfully."
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
 *         description: Mpuza not found! 
 *       422:
 *         description: Validation error!
 *       500:
 *         description: Internal Server error!
 *
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function putMpuzamiryangoremezo(req: AuthRequest, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const parsedBody = mpuzaMiryangoRemezoSchema.safeParse(req.body);
  if (!parsedBody.success) {
    logger.error("Validation error: %o", parsedBody.error.issues);
    logger.error("Validation error: %o", req.body);
    return res.status(422).send({ message: "Validation error!" });
  }

  const MpuzaRepository = AppDataSource.getRepository(MpuzaEntity);
  try {
    const id = Number(req.params.id);
    const savedMpuza = await MpuzaRepository.findOne({ where: { id } });
    if (savedMpuza === null) {
      return res.status(404).send({ message: "Mpuza does not exist!" });
    }

    if (parsedBody.data.title) {
      savedMpuza.title = parsedBody.data.title;
    }

    if (parsedBody.data.leader) {
      savedMpuza.leader = parsedBody.data.leader;
    }

    if (parsedBody.data.phone) {
      savedMpuza.phone = parsedBody.data.phone;
    }

    if (parsedBody.data.description_en) {
      savedMpuza.description_en = parsedBody.data.description_en;
    }
    if (parsedBody.data.description_fr) {
      savedMpuza.description_fr = parsedBody.data.description_fr;
    }
    if (parsedBody.data.description_rw) {
      savedMpuza.description_rw = parsedBody.data.description_rw;
    }

    if (parsedBody.data.community) {
      const communityRepository = AppDataSource.getRepository(CommunityEntity);
      const savedCommunity = await communityRepository.findOne({ where: { id: parsedBody.data.community } });
      if (savedCommunity) {
        savedMpuza.community = savedCommunity
      }
    }

    if (parsedBody.data.backgroundImageId) {
      const imageRepository = AppDataSource.getRepository(ImageEntity);
      const savedImage = await imageRepository.findOne({ where: { id: parsedBody.data.backgroundImageId } });
      if (savedImage) {
        savedMpuza.backgroundImage = savedImage
      }
    }

    await MpuzaRepository.save(savedMpuza);
    return res.status(201).send({ message: "Mpuza updated successfully." });
  } catch (error: any) {
    logger.error("Updating Mpuza failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
