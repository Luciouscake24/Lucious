import express from "express";
import { getUsers } from "../controllers/UserController.js";
import { protect, adminOnly } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/", protect, adminOnly, getUsers);

export default router;