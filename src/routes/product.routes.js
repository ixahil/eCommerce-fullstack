import { Router } from "express";
import {
  createProduct,
  updateProduct,
  getProducts,
  getProduct,
  deleteProduct,
} from "../controllers/index.js";
import { authenticate } from "../middlewares/index.js";

const router = Router();

router.get("", getProducts);
router.get("/:id", getProduct);
router.post("", createProduct);
router.post("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export { router as productRouter };
