import express from "express";

import {
  placeOrder,
  getOrders,
  getMyOrders,
  getSingleOrder,
  updateOrderStatus
} from "../controllers/OrderController.js";

import validateOrder from "../middleware/ValidateOrder.js";
import { protect, adminOnly } from "../middleware/AuthMiddleware.js";

const router = express.Router();

/* PLACE ORDER */
router.post("/", protect, validateOrder, placeOrder);

/* USER ORDERS */
router.get("/my", protect, getMyOrders);

/* TRACK ORDER */
router.get("/:id", protect, getSingleOrder);

/* ADMIN */
router.get("/", protect, adminOnly, getOrders);

/* UPDATE STATUS */
router.put("/:id", protect, adminOnly, updateOrderStatus);

export default router;