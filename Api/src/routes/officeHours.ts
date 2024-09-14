/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import { authenticateJWT } from "../middleware/authenticate";
import { postOfficeHour } from "./officeHoursControllers/postOfficeHour";
import { getOfficeHours } from "./officeHoursControllers/getOfficeHour";
import { putOfficeHour } from "./officeHoursControllers/putOfficeHout";
import { deleteOfficeHour } from "./officeHoursControllers/deletOfficeHour";


const router = express.Router();

router.post("/office-hours", authenticateJWT, postOfficeHour )
router.get("/office-hours/all",
    authenticateJWT, 
    getOfficeHours )
router.put("/office-hours/:id", authenticateJWT, putOfficeHour);
router.delete("/office-hours/:id", authenticateJWT, deleteOfficeHour);

export default router;
