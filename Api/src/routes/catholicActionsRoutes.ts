/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import { authenticateJWT } from "../middleware/authenticate";
import { getAllCatholicActions } from "./catholicActionControllers/getCatholicAction";
import { postCatholicAction } from "./catholicActionControllers/postCatholicAction";
import { putCatholicAction } from "./catholicActionControllers/putCatholicAction";
import { deleteCatholicAction } from "./catholicActionControllers/deleteCatholicAction";

const router = express.Router();

router.get("/catholic-actions", authenticateJWT, getAllCatholicActions )
router.post("/catholic-actions", authenticateJWT, postCatholicAction )
router.put("/catholic-actions/:id", authenticateJWT, putCatholicAction);
router.delete("/catholic-actions/:id", authenticateJWT, deleteCatholicAction);

export default router;