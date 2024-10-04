import { Router } from "express";
import { getUser } from "../controllers/index.js";
import { authenticate } from "../middlewares/index.js";

const router = Router();

router.get("", authenticate, getUser);

export { router as userRouter };
