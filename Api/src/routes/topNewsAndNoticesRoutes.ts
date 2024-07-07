/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import { authenticateJWT } from "../middleware/authenticate";
import { postTopParishNewsAndNotices } from "./topNewsAndNoticesControllers/postTopNewsAndNotices";

const router = express.Router();

router.post("/top-news-and-notices", authenticateJWT, postTopParishNewsAndNotices )
// router.put("/location/:id", authenticateJWT, putLocation);
// router.delete("/location/:id", authenticateJWT, deleteLocation);

export default router;
