/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import { authenticateJWT } from "../middleware/authenticate";
import { postCommission } from "./CommissionsControllers/postCommission";
import { getAllCommissions } from "./CommissionsControllers/getCommission";
import { putCommission } from "./CommissionsControllers/putCommission";
import { deleteCommission } from "./CommissionsControllers/deleteCommission";


const router = express.Router();

router.post("/commissions", authenticateJWT, postCommission )
router.get("/commissions/all",
    // authenticateJWT, 
    getAllCommissions )
router.put("/commissions/:id", authenticateJWT, putCommission);
router.delete("/commissions/:id", authenticateJWT, deleteCommission);

export default router;
