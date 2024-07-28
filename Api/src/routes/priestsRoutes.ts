/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import { authenticateJWT } from "../middleware/authenticate";
import { deletePriest } from "./priestsControllers/deletePriests";
import { getAllPriests } from "./priestsControllers/getPriests";
import { postPriests } from "./priestsControllers/postPriests";
import { putPriests } from "./priestsControllers/putPriests";

const router = express.Router();

router.post("/priests", authenticateJWT, postPriests )
router.get("/priests/all", authenticateJWT, getAllPriests )
router.put("/priests/:id", authenticateJWT, putPriests);
router.delete("/priests", authenticateJWT, deletePriest);

export default router;
