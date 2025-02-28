/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import { authenticateJWT } from "../middleware/authenticate";
import { getWelcomeMessage } from "./welcomeMessageControllers/getWelcomeMessage";
import { PostWelcomeMessage } from "./welcomeMessageControllers/postWelcomeMessage";
import { PutWelcomeMessage } from "./welcomeMessageControllers/putWelcomeMessage";
import{ getWelcomeMessageFrontend } from "./welcomeMessageControllers/getWelcomeMessageFrontend";

const router = express.Router();

router.get("/welcomeMessage", authenticateJWT, getWelcomeMessage )
router.post("/welcomeMessage", authenticateJWT, PostWelcomeMessage )
router.put("/welcomeMessage/:id", authenticateJWT, PutWelcomeMessage)
router.put("/WelcomeMessageFrontend/msg", getWelcomeMessageFrontend)

export default router;
