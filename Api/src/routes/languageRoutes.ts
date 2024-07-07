/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import { authenticateJWT } from "../middleware/authenticate";
import { postLanguage } from "./languageControllers/postLanguage";

const router = express.Router();

router.post("/language", authenticateJWT, postLanguage )
// router.put("/location/:id", authenticateJWT, putLocation);
// router.delete("/location/:id", authenticateJWT, deleteLocation);

export default router;
