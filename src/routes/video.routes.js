import { Router } from "express";
import createVideo from "../controllers/video.controller.js";
const router = Router();
router.route("/createVideo").post(createVideo);
export default router;