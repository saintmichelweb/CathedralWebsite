/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import { authenticateJWT } from "../middleware/authenticate";
import { postMassTime } from "./massTimesControllers/postMassTime";

const router = express.Router();

// router.post("/mass-times", authenticateJWT, postMassTime )
// router.put("/location/:id", authenticateJWT, putLocation);
// router.delete("/location/:id", authenticateJWT, deleteLocation);

export default router;
