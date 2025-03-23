import express from "express";
import { registerUser, loginUser, checkPassword, resetPassword } from "../controllers/auth.controller";

const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post('/test-password', checkPassword);
router.post('/reset-password', resetPassword);

export default router;