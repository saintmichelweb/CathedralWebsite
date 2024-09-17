/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import { authenticateJWT } from "../middleware/authenticate";
import { postparishCommitteeCouncil } from "./parishCommitteeCouncilControllers/postParishCommitteeCouncil";
import { getparishCommitteeCouncil } from "./parishCommitteeCouncilControllers/getParishCommitteeCouncil";
import { putparishCommitteeCouncil } from "./parishCommitteeCouncilControllers/putParishCommitteeCouncil";
import { deleteparishCommitteeCouncil } from "./parishCommitteeCouncilControllers/deleteParishCommitteeCouncil";


const router = express.Router();

router.post("/parishCommitteeCouncil", authenticateJWT, postparishCommitteeCouncil )
router.get("/parishCommitteeCouncil/all",
    authenticateJWT, 
    getparishCommitteeCouncil )
router.put("/parishCommitteeCouncil/:id", authenticateJWT, putparishCommitteeCouncil);
router.delete("/parishCommitteeCouncil/:id", authenticateJWT, deleteparishCommitteeCouncil);

export default router;
