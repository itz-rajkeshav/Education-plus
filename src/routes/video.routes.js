import { Router } from "express";
import {createVideo,getAllVideo,delVideo} from "../controllers/video.controller.js";
const router = Router();
router.route("/createVideo").post(createVideo);
router.route("/delVideo").post(delVideo);
router.route("/getAllVideo").get(getAllVideo);

export default router;