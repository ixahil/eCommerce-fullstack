import { Router } from "express";
import { login, logout, register } from "../controllers/index.js";
import { authenticate } from "../middlewares/index.js";
import { createMenu } from "../controllers/index.js";

const router = Router();

router.post("/menus", createMenu);

export { router as menuRouter };
