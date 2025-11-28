import express from "express";
import { createEvent , getEventByProfile, updateEvent } from "../controllers/eventController.js";


const router = express.Router();

router.post("/create" ,  createEvent );
router.get("/:profileId" , getEventByProfile);
router.put("/:id" ,updateEvent);
export default router;