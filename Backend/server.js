import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

/* ROUTES */
import productRoutes from "./routes/ProductRoutes.js";
import metaRoutes from "./routes/MetaRoutes.js";
import orderRoutes from "./routes/OrderRoutes.js";
import authRoutes from "./routes/AuthRoutes.js";
import userRoutes from "./routes/UserRoutes.js";

/* MIDDLEWARE */
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

/* GLOBAL MIDDLEWARE */

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

connectDB();

/* TEST */

app.get("/",(req,res)=>{
res.send("🎂 Lucious Cake API running...");
});

/* API */

app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/product",productRoutes);
app.use("/api/meta",metaRoutes);
app.use("/api/order",orderRoutes);

/* ERROR */

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
console.log(`🚀 Server running on port ${PORT}`);
});