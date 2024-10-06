import { Router } from "express";
import {
  createBrand,
  deleteBrand,
  getBrand,
  getBrands,
  updateBrand,
} from "../controllers/index.js";

const router = Router();

router.get("", getBrands);
router.get("/:id", getBrand);
router.post("", createBrand);
router.post("/:id", updateBrand);
router.delete("/:id", deleteBrand);

export { router as brandRouter };
