import Order from "../models/OrderModel.js";
import Product from "../models/ProductModel.js";

/* PLACE ORDER */
export const placeOrder = async (req, res, next) => {
  try {

    const { items, customer } = req.body;

    let total = 0;
    const formattedItems = [];

    // 🔥 LOOP THROUGH CART ITEMS
    for (const item of items) {

      const product = await Product.findById(item._id);

      if (!product) continue;

      const price = product.price;

      total += price * item.quantity;

      formattedItems.push({
        productId: product._id,

        // ✅ SNAPSHOT DATA (VERY IMPORTANT)
        name: product.name,
        image: product.image,
        price: price,

        quantity: item.quantity,
        weight: item.weight,
        flavour: item.flavour
      });
    }

    const order = new Order({
      userId: req.user._id,
      customer,
      items: formattedItems,
      total
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order
    });

  } catch (error) {
    next(error);
  }
};


/* ADMIN - ALL ORDERS */
export const getOrders = async (req, res, next) => {
  try {

    const orders = await Order.find()
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    next(error);
  }
};


/* USER - MY ORDERS */
export const getMyOrders = async (req, res, next) => {
  try {

    const orders = await Order.find({
      userId: req.user._id
    })
    .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    next(error);
  }
};


/* TRACK ORDER */
export const getSingleOrder = async (req, res, next) => {
  try {

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    res.json(order);

  } catch (error) {
    next(error);
  }
};


/* UPDATE STATUS (ADMIN) */
export const updateOrderStatus = async (req, res, next) => {
  try {

    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(order);

  } catch (error) {
    next(error);
  }
};