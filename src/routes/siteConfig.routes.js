import { Router } from "express";
import {
  createMenu,
  getMenus,
  getMenuById,
  updateSiteConfig,
  getSiteConfig,
} from "../controllers/index.js";

const router = Router();

router.post("/store-config/update", updateSiteConfig);
router.get("/store-config", getSiteConfig);
router.get("/store-config/:id", getMenuById);

export { router as siteConfigRouter };
