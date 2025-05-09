/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import { authenticateJWT } from "../middleware/authenticate";
import { postMuryangoRemezo } from "./MuryangoRemezoControllers/postUmuryangoRemezo";
import { getAllMiryangoRemezo } from "./MuryangoRemezoControllers/getImiryangoRemezo";
import { putMuryangoRemezo } from "./MuryangoRemezoControllers/putUmuryangoRemezo";
import { deleteMuryangoRemezo } from "./MuryangoRemezoControllers/deleteUmuryangoRemezo";


const router = express.Router();

router.post("/miryangoremezo", authenticateJWT, postMuryangoRemezo )
router.get("/miryangoremezo",
    authenticateJWT, 
    getAllMiryangoRemezo )
router.put("/miryangoremezo/:id", authenticateJWT, putMuryangoRemezo);
router.delete("/miryangoremezo/:id", authenticateJWT, deleteMuryangoRemezo);

export default router;
