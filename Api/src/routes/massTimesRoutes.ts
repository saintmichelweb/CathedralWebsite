/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import { authenticateJWT } from "../middleware/authenticate";
import { postMassTime } from "./massTimesControllers/postMassTime";
import { getPortalMassTimes } from "./massTimesControllers/getPortalMassTimes";
import { putMassTimes } from "./massTimesControllers/putMassTime";

const router = express.Router();

router.get("/mass-times/all", authenticateJWT, getPortalMassTimes )
router.post("/mass-times", authenticateJWT, postMassTime )
router.put("/mass-times/:id", authenticateJWT, putMassTimes);
// router.delete("/location/:id", authenticateJWT, deleteLocation);

export default router;
