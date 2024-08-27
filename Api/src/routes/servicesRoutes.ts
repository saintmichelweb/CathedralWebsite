/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import { authenticateJWT } from "../middleware/authenticate";
import { postService } from "./servicesControllers/postService";
import { getServices } from "./servicesControllers/getServices";
import { putService } from "./servicesControllers/putService";
import { deleteService } from "./servicesControllers/deletService";


const router = express.Router();

router.post("/services", authenticateJWT, postService )
router.get("/services/all",
    // authenticateJWT, 
    getServices )
router.put("/services/:id", authenticateJWT, putService);
router.delete("/services/:id", authenticateJWT, deleteService);

export default router;
