import express from "express";
import {
  addProduct,
  getProducts,
  deleteProduct,
  getSingleProduct
} from "../controllers/ProductControll.js";

import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/add", upload.single("image"), addProduct);
router.get("/list", getProducts);
router.get("/single/:id", getSingleProduct);
router.delete("/delete/:id", deleteProduct);

export default router;