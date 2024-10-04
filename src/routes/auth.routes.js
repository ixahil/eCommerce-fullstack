import { Router } from "express";
import { login, logout, register } from "../controllers/index.js";
import { authenticate } from "../middlewares/index.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

export { router as authRouter };
