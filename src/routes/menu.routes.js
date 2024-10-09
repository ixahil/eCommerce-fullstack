import { Router } from "express";
import { createMenu, getMenus, getMenuById } from "../controllers/index.js";

const router = Router();

router.post("/menus", createMenu);
router.get("/menus", getMenus);
router.get("/menus/:id", getMenuById);

export { router as menuRouter };
