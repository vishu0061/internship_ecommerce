import Order from "../models/orderModel.js";

// 🔹 Place order (Cash on Delivery)
export const placeOrder = async (req, res) => {
  try {
    const order = new Order({
      user: req.user.id,
      items: req.body.items,
      totalAmount: req.body.totalAmount,
      paymentMethod: "COD",
      status: "Pending",
    });

    await order.save();
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ message: "Error placing order", error: err.message });
  }
};

// 🔹 Place order (Stripe)
export const placeOrderStripe = async (req, res) => {
  try {
    // You can integrate Stripe payment here
    res.json({ success: true, message: "Stripe order placed" });
  } catch (err) {
    res.status(500).json({ message: "Stripe error", error: err.message });
  }
};

// 🔹 Place order (Razorpay)
export const placeOrderRazorpay = async (req, res) => {
  try {
    // You can integrate Razorpay payment here
    res.json({ success: true, message: "Razorpay order placed" });
  } catch (err) {
    res.status(500).json({ message: "Razorpay error", error: err.message });
  }
};

// 🔹 Admin: get all orders
export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching all orders", error: err.message });
  }
};

// 🔹 User: get his/her own orders
export const userOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user orders", error: err.message });
  }
};

// 🔹 Admin: update order status
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const order = await Order.findById(orderId);

    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ message: "Error updating order status", error: err.message });
  }
};

// 🔹 Stripe verification (dummy for now)
export const verifyStripe = async (req, res) => {
  try {
    res.json({ success: true, message: "Stripe payment verified" });
  } catch (err) {
    res.status(500).json({ message: "Stripe verification failed", error: err.message });
  }
};

// 🔹 Razorpay verification (dummy for now)
export const verifyRazorpay = async (req, res) => {
  try {
    res.json({ success: true, message: "Razorpay payment verified" });
  } catch (err) {
    res.status(500).json({ message: "Razorpay verification failed", error: err.message });
  }
};
