import express from "express";
import {
  addProduct,
  getProducts,
  deleteProduct,
  getSingleProduct,
  importProducts,
  getBestSellers
} from "../controllers/ProductControll.js";

import { upload } from "../middleware/upload.js";

const router = express.Router();

/* ADD PRODUCT */
router.post("/add", upload.single("image"), addProduct);

/* IMPORT PRODUCTS FROM EXCEL */
router.post("/import", upload.single("file"), importProducts);

/* GET ALL PRODUCTS */
router.get("/list", getProducts);

/* ⭐ GET BESTSELLER PRODUCTS */
router.get("/bestsellers", getBestSellers);

/* GET SINGLE PRODUCT */
router.get("/single/:id", getSingleProduct);

/* DELETE PRODUCT */
router.delete("/delete/:id", deleteProduct);

export default router;