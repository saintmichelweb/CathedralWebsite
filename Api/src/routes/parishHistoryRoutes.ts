/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import { authenticateJWT } from "../middleware/authenticate";
import { postParishHistory } from "./parishHistoryControllers/postParishHistory";
import { getParishHistory } from "./parishHistoryControllers/getParishHistory";

const router = express.Router();

router.get("/parish-history", authenticateJWT, getParishHistory )
router.post("/parish-history", authenticateJWT, postParishHistory )

export default router;
