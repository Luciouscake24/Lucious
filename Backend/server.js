import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import productRoutes from "./routes/ProductRoutes.js"; 
import metaRoutes from "./routes/MetaRoutes.js"; // categories/collections/tags/occasions

dotenv.config();
const app = express();

/* =========================
   MIDDLEWARE
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   CONNECT DATABASE
========================= */
connectDB();

/* =========================
   TEST ROUTE
========================= */
app.get("/", (req,res)=>{
  res.send("🎂 Lucious Cake API running...");
});

/* =========================
   ROUTES
========================= */
app.use("/api/product", productRoutes); // products
app.use("/api/meta", metaRoutes);       // ⭐ categories/collections/tags/occasions

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log("🚀 Server running on port "+PORT));