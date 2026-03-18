import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

  name: String,
  price: Number,

  categoryId: String,
  collectionId: String,
  occasionId: String,

  flavour: String,
  diet: String,
  cream: String,
  weight: String,

  tags: [String],

  image: String,

  /* ⭐ EXISTING */
  bestseller: {
    type: Boolean,
    default: false
  },

  /* 🔥 ADD THIS (VERY IMPORTANT) */
  orders: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

export default mongoose.model("Product", productSchema);