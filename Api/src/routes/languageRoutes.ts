/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import { authenticateJWT } from "../middleware/authenticate";
import { postLanguage } from "./languageControllers/postLanguage";
import { getLanguages } from "./languageControllers/getLanguages";
import { putLanguage } from "./languageControllers/putLanguage";
import { deleteLanguage } from "./languageControllers/deletLanguage";

const router = express.Router();

router.get("/language/all", authenticateJWT, getLanguages )
router.post("/language", authenticateJWT, postLanguage )
router.put("/language/:id", authenticateJWT, putLanguage);
router.delete("/language/:id", authenticateJWT, deleteLanguage);

export default router;
