/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import { authenticateJWT } from "../middleware/authenticate";
import { postTopParishNewsAndNotices } from "./topNewsAndNoticesControllers/postTopNewsAndNotices";
import { getAllTopParishNewsAndNotices } from "./topNewsAndNoticesControllers/getAllTopNewsAndNotices";
import { putTopParishNewsAndNotices } from "./topNewsAndNoticesControllers/putTopNewsAndNotices";

const router = express.Router();

router.get("/top-news-and-notices/all", authenticateJWT, getAllTopParishNewsAndNotices )
router.post("/top-news-and-notices", authenticateJWT, postTopParishNewsAndNotices )
router.put("/top-news-and-notices/:id", authenticateJWT, putTopParishNewsAndNotices);
// router.delete("/location/:id", authenticateJWT, deleteLocation);

export default router;
