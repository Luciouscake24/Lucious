import express from "express";

import {
  placeOrder,
  getOrders
} from "../controllers/OrderController.js";

import validateOrder from "../middleware/ValidateOrder.js";

const router = express.Router();

/* CREATE ORDER */

router.post(
  "/",
  validateOrder,
  placeOrder
);

/* GET ORDERS */

router.get(
  "/",
  getOrders
);

export default router;