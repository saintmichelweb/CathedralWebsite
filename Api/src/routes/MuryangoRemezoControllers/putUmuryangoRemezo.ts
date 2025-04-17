import { Response } from "express";
import { AuthRequest } from "../../types/express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { z } from "zod";
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
 * /miryangoremezo/{id}:
 *   put:
 *     tags:
 *       - Muryango Remezo
 *     security:
 *       - Authorization: []
 *     summary: Update a muryangoRemezo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: integer
 *         description: muryangoRemezo ID
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
 *         description: muryangoRemezo saved successfully
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
 *                   example: "muryangoRemezo updated successfully."
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
 *         description: MuryangoRemezo not found! 
 *       422:
 *         description: Validation error!
 *       500:
 *         description: Internal Server error!
 *
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function putMuryangoRemezo(req: AuthRequest, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const parsedBody = muryangoRemezoSchema.safeParse(req.body);
  if (!parsedBody.success) {
    logger.error("Validation error: %o", parsedBody.error.issues);
    logger.error("Validation error: %o", req.body);
    return res.status(422).send({ message: "Validation error!" });
  }

  const MuryangoRemezoRepository = AppDataSource.getRepository(MuryangoremezoEntity);
  const mpuzaRepository = AppDataSource.getRepository(MpuzaEntity)
  try {
    const id = Number(req.params.id);
    const savedMuryangoRemezo = await MuryangoRemezoRepository.findOne({ where: { id } });
    if (savedMuryangoRemezo === null) {
      return res.status(404).send({ message: "MuryangoRemezo does not exist!" });
    }

    if (parsedBody.data.title) {
      savedMuryangoRemezo.title = parsedBody.data.title;
    }

    if (parsedBody.data.header) {
      savedMuryangoRemezo.header = parsedBody.data.header;
    }

    if (parsedBody.data.phone) {
      savedMuryangoRemezo.phone = parsedBody.data.phone;
    }
 
    if (parsedBody.data.mpuzaId) {
      const mpuza =  await mpuzaRepository.findOne({where: {id: parsedBody.data.mpuzaId}})
      if ( mpuza !== null ) {
        savedMuryangoRemezo.mpuza = mpuza
      } else {
        return res.status(404).send({ message: "mpuzaMiryangoRemezo does not exist!" });
      }
    }

    await MuryangoRemezoRepository.save(savedMuryangoRemezo);
    return res.status(201).send({ message: "MuryangoRemezo updated successfully." });
  } catch (error: any) {
    logger.error("Updating MuryangoRemezo failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
