import { Router } from "express";
import {
  createCollection,
  deleteCollection,
  updateCollection,
  getCollections,
  getCollection,
} from "../controllers/index.js";
import { authenticate } from "../middlewares/index.js";

const router = Router();

router.post("", createCollection);
router.post("/:id", updateCollection);
router.delete("/:id", deleteCollection);
router.get("/", getCollections);
router.get("/:id", getCollection);

export { router as collectionRouter };
