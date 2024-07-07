/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import { authenticateJWT } from "../middleware/authenticate";
import { postLanguage } from "./languageControllers/postLanguage";
import { getLanguages } from "./languageControllers/getLanguages";

const router = express.Router();

router.get("/language/all", authenticateJWT, getLanguages )
router.post("/language", authenticateJWT, postLanguage )
// router.put("/location/:id", authenticateJWT, putLocation);
// router.delete("/location/:id", authenticateJWT, deleteLocation);

export default router;
