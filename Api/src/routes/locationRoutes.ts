/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import { postLocation } from "./locationControllers/postLocation";
import { deleteLocation } from "./locationControllers/deletLocation";
import { putLocation } from "./locationControllers/putLocation";
import { authenticateJWT } from "../middleware/authenticate";
import { getLocations } from "./locationControllers/getLocation";

const router = express.Router();

router.get("/location/all", authenticateJWT, getLocations )
router.post("/location", authenticateJWT, postLocation )
router.put("/location/:id", authenticateJWT, putLocation);
router.delete("/location/:id", authenticateJWT, deleteLocation);

export default router;
