import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

/* ROUTES */
import productRoutes from "./routes/ProductRoutes.js";
import metaRoutes from "./routes/MetaRoutes.js";
import orderRoutes from "./routes/OrderRoutes.js";

/* MIDDLEWARE */
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

/* =========================
   GLOBAL MIDDLEWARE
========================= */

app.use(cors());
app.use(express.json());

/* serve uploaded files */
app.use("/uploads", express.static("uploads"));

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
   API ROUTES
========================= */

app.use("/api/product", productRoutes);

/* meta routes now include:
   category
   collection
   occasion
   cake-filter
*/
app.use("/api/meta", metaRoutes);

app.use("/api/order", orderRoutes);

/* =========================
   ERROR HANDLER
========================= */

app.use(errorHandler);

/* =========================
   START SERVER
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
  console.log(`🚀 Server running on port ${PORT}`);
});