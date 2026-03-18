import express from "express";
import Product from "../models/ProductModel.js";

const router = express.Router();

/* 🔥 GET TRENDING PRODUCTS */
router.get("/", async (req, res) => {
  try {

    const trendingProducts = await Product.find({
      orders: { $gt: 0 } // 🔥 ONLY products with orders > 0
    })
      .sort({ orders: -1 }) // highest orders first
      .limit(4);

    res.json(trendingProducts);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching trending products"
    });
  }
});

export default router;