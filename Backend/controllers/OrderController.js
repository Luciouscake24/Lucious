import Order from "../models/OrderModel.js";

/* CREATE ORDER */

export const placeOrder = async(req,res,next)=>{

  try{

    const order = new Order(req.body);

    await order.save();

    res.status(201).json({
      success:true,
      message:"Order placed successfully",
      order
    });

  }catch(error){

    next(error);

  }

};


/* GET ALL ORDERS */

export const getOrders = async(req,res,next)=>{

  try{

    const orders = await Order
      .find()
      .sort({ createdAt:-1 });

    res.json(orders);

  }catch(error){

    next(error);

  }

};