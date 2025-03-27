import express from 'express';
import { signup,verifyEmail,login } from "../controller/auth.Controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", login);
router.get("/verify/:token", verifyEmail);

export default router;
