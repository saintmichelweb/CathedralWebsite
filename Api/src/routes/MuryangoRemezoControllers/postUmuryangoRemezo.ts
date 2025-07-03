import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { z } from "zod";
import { AuthRequest } from "../../types/express";
import { ImageEntity } from "../../entity/ImagesEntity";
import { MuryangoremezoEntity } from "../../entity/MuryangoremezoEntity";
import { MpuzaEntity } from "../../entity/MpuzaEntity";

const muryangoRemezoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "name is required" }),
  header: z
    .string()
    .trim()
    .min(1, { message: "name is required" }),
  phone: z
    .string()
    .trim()
    .min(1, { message: "name is required" }),
  mpuzaId: z
    .number()
    .min(1, { message: "mpuzaMiryangoRemezo id is required" }),
});

/**
 * @openapi
 * /miryangoremezo:
 *   post:
 *     tags:
 *       - Muryango Remezo
 *     security:
 *       - Authorization: []
 *     summary: Add a MuryangoRemezo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "MuryangoRemezo"
 *                 description: "MuryangoRemezo title"
 *               header:
 *                 type: string
 *                 example: "MuryangoRemezo"
 *                 description: "MuryangoRemezo header"
 *               phone:
 *                 type: string
 *                 example: "MuryangoRemezo"
 *                 description: "MuryangoRemezo phone"
 *               mpuza:
 *                 type: number
 *                 example: 2
 *                 description: "MuryangoRemezo mpuza"
 *     responses:
 *       200:
 *         description: MuryangoRemezo saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "MuryangoRemezo  saved successfully"
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
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
export async function postMuryangoRemezo(req: AuthRequest, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const parsedBody = muryangoRemezoSchema.safeParse(req.body)
  if (!parsedBody.success) {
    logger.error("Validation error: %o", parsedBody.error.issues);
    logger.error("Validation error: %o", req.body);
    return res.status(422).send({ message: "Validation error" });
  }


  const newMuryangoRemezoRepository = AppDataSource.getRepository(MuryangoremezoEntity)
  const mpuzaRepository = AppDataSource.getRepository(MpuzaEntity)

  try {
    const newMuryangoRemezo = new MuryangoremezoEntity();
    newMuryangoRemezo.title = parsedBody.data.title
    newMuryangoRemezo.header = parsedBody.data.header
    newMuryangoRemezo.phone = parsedBody.data.phone

    const mpuza =  await mpuzaRepository.findOne({where: {id: parsedBody.data.mpuzaId}})
    if ( mpuza !== null ) {
      newMuryangoRemezo.mpuza = mpuza
    } else {
      return res.status(404).send({ message: "mpuzaMiryangoRemezo does not exist!" });
    }

    // if (parsedBody.data.backgroundImageId) {
    //   const imageRepository = AppDataSource.getRepository(ImageEntity);
    //   const savedImage = await imageRepository.findOne({ where: { id: parsedBody.data.backgroundImageId } });
    //   if (savedImage) {
    //     newMuryangoRemezo.backgroundImage = savedImage
    //   }
    // }
    await newMuryangoRemezoRepository.save(newMuryangoRemezo)
    return res.status(201).send({ message: "MuryangoRemezo details added successfully" });
  } catch (error: any) {
    logger.error("Creating MuryangoRemezo failed: %s", error);
    res.status(500).send({ message: "Internal server error" });
  }
}
