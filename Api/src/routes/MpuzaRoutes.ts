/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import { authenticateJWT } from "../middleware/authenticate";
import { postMpuzaMiryangoRemezo } from "./MpuzaControllers/postMpuza";
import { getAllMpuzas } from "./MpuzaControllers/getMpuza";
import { putMpuzamiryangoremezo } from "./MpuzaControllers/putMpuza";
import { deleteMpuzaMiryangoRemezo } from "./MpuzaControllers/deleteMpuza";


const router = express.Router();

router.post("/mpuzamiryangoremezo", authenticateJWT, postMpuzaMiryangoRemezo )
router.get("/mpuzamiryangoremezo",
    authenticateJWT, 
    getAllMpuzas )
router.put("/mpuzamiryangoremezo/:id", authenticateJWT, putMpuzamiryangoremezo);
router.delete("/mpuzamiryangoremezo/:id", authenticateJWT, deleteMpuzaMiryangoRemezo);

export default router;
