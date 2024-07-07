/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import { authenticateJWT } from "../middleware/authenticate";
import { postRecentEvent } from "./recentEventsControllers/postRecentEvent";

const router = express.Router();

router.post("/recent-events", authenticateJWT, postRecentEvent )
// router.put("/location/:id", authenticateJWT, putLocation);
// router.delete("/location/:id", authenticateJWT, deleteLocation);

export default router;
