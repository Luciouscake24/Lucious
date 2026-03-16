import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

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
      productId:String,
      name:String,
      price:Number,
      quantity:Number,
      weight:String,
      flavour:String
    }
  ],

  total:{
    type:Number,
    required:true
  },

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