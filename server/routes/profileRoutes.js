import express from "express";

import { getProfiles , createProfile} from "../controllers/profileController.js";


const router = express.Router();

router.post("/create" , createProfile);
router.get("/" , getProfiles);

export default router;
