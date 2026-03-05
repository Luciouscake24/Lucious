import express from "express";
import { upload } from "../middleware/upload.js";
import { createItem, getItems, deleteItem } from "../controllers/MetaController.js";

import Category from "../models/CategoryModel.js";
import Collection from "../models/CollectionModel.js";
import Occasion from "../models/OccasionModel.js";
import Tag from "../models/TagModel.js";

const router = express.Router();

/* CATEGORY */
router.post("/category", upload.single("image"), createItem(Category));
router.get("/category", getItems(Category));
router.delete("/category/:id", deleteItem(Category));

/* COLLECTION */
router.post("/collection", upload.single("image"), createItem(Collection));
router.get("/collection", getItems(Collection));
router.delete("/collection/:id", deleteItem(Collection));

/* OCCASION */
router.post("/occasion", upload.single("image"), createItem(Occasion));
router.get("/occasion", getItems(Occasion));
router.delete("/occasion/:id", deleteItem(Occasion));

/* TAG (no image) */
router.post("/tag", createItem(Tag));
router.get("/tag", getItems(Tag));
router.delete("/tag/:id", deleteItem(Tag));

export default router;