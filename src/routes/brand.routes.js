import { Router } from "express";
import {
  createBrand,
  createCollection,
  getBrands,
  deleteBrand,
  deleteCollection,
  updateBrand,
  updateCollection,
} from "../controllers/index.js";
import { authenticate } from "../middlewares/index.js";

const router = Router();

router.get("", getBrands);
router.post("", authenticate, createBrand);
router.post("/:id", authenticate, updateBrand);
router.delete("/:id", authenticate, deleteBrand);

export { router as brandRouter };
