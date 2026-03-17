import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  customer:{
    name:{ type:String, required:true },
    phone:{ type:String, required:true },
    email:String,
    address:{ type:String, required:true },
    city:String,
    pincode:String,
    payment:String
  },

  items:[
    {
      productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },

      // 🔥 SNAPSHOT
      name:String,
      image:String,
      price:Number,

      quantity:Number,
      weight:String,
      flavour:String
    }
  ],

  total:Number,

  status:{
    type:String,
    default:"Pending"
  },

  createdAt:{
    type:Date,
    default:Date.now
  }

});

export default mongoose.model("Order",orderSchema);