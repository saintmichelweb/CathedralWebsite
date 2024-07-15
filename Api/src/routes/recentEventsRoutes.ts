/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import { authenticateJWT } from "../middleware/authenticate";
import { postRecentEvent } from "./recentEventsControllers/postRecentEvent";
import { getAllRecentEvents } from "./recentEventsControllers/getRecentEvents";
import { putRecentEvent } from "./recentEventsControllers/putRecentEvent";

const router = express.Router();

router.post("/recent-events", authenticateJWT, postRecentEvent )
router.get("/recent-events/all", authenticateJWT, getAllRecentEvents )
router.put("/recent-events/:id", authenticateJWT, putRecentEvent);
// router.delete("/location/:id", authenticateJWT, deleteLocation);

export default router;
