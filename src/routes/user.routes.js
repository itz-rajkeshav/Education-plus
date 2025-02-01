import { Router } from "express";
// import {verifyJWT} from "../middleware/auth.middleware.js"
import {createUser} from "../controllers/User.controller.js"
import { login } from "../controllers/User.controller.js";
const router = Router();
router.route("/register").post(createUser);
router.route("/login").post(login);
export default router;