import { Router } from "express";
import {createCourse} from "../controllers/course.controller.js";
import { getAllCourse } from "../controllers/course.controller.js";
import { delCourse } from "../controllers/course.controller.js";
const router = Router();
router.route("/createCourse").post(createCourse);
router.route("/getAllCourse").get(getAllCourse);
router.route("/delCourse").post(delCourse);
export default router;