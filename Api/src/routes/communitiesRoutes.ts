/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import { authenticateJWT } from "../middleware/authenticate";
import { postCommunity } from "./ComunitiesControllers/postCommunity";
import { getAllCommunities } from "./ComunitiesControllers/getCommunities";
import { putCommunity } from "./ComunitiesControllers/putCommunity";
import { deleteCommunity } from "./ComunitiesControllers/deleteCommunity";


const router = express.Router();

router.post("/communities", authenticateJWT, postCommunity )
router.get("/communities",
    authenticateJWT, 
    getAllCommunities )
router.put("/communities/:id", authenticateJWT, putCommunity);
router.delete("/communities/:id", authenticateJWT, deleteCommunity);

export default router;
