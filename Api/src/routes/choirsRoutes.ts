/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import { authenticateJWT } from "../middleware/authenticate";
import { getAllChoir } from "./choirControllers/getChoir";
import { postChoir } from "./choirControllers/postChoir";
import { putChoir } from "./choirControllers/putChoir";
import { deleteChoir } from "./choirControllers/deleteChoir";

const router = express.Router();

router.get("/Choir/all", authenticateJWT, getAllChoir )
router.post("/Choir", authenticateJWT, postChoir )
router.put("/Choir/:id", authenticateJWT, putChoir);
router.delete("/Choir/:id", authenticateJWT, deleteChoir);

export default router;