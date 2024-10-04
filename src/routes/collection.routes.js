import { Router } from "express";
import {
  createCollection,
  deleteCollection,
  updateCollection,
  getCollections,
} from "../controllers/index.js";
import { authenticate } from "../middlewares/index.js";

const router = Router();

router.post("", authenticate, createCollection);
router.post("/:id", authenticate, updateCollection);
router.delete("/:id", authenticate, deleteCollection);
router.get("/", getCollections);

export { router as collectionRouter };
