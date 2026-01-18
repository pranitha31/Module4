const express = require("express");
const router = express.Router();

// Create Order
router.post("/", async (req, res) => {
  const { productId, quantity } = req.body;
  const product = req.db.data.products.find(p => p.id === productId);

  if (!product) return res.status(404).json({ error: "Product not found" });
  if (product.stock === 0 || quantity > product.stock) {
    return res.status(400).json({ error: "Insufficient stock" });
  }

  const totalAmount = product.price * quantity;
  const order = {
    id: req.db.data.orders.length + 1,
    productId,
    quantity,
    totalAmount,
    status: "placed",
    createdAt: new Date().toISOString().split("T")[0]
  };

  product.stock -= quantity;
  req.db.data.orders.push(order);
  await req.db.write();

  res.status(201).json(order);
});

// Get all orders
router.get("/", (req, res) => {
  res.status(200).json(req.db.data.orders);
});

// Cancel Order
router.delete("/:orderId", async (req, res) => {
  const orderId = parseInt(req.params.orderId);
  const order = req.db.data.orders.find(o => o.id === orderId);

  if (!order) return res.status(404).json({ error: "Order not found" });
  if (order.status === "cancelled") {
    return res.status(400).json({ error: "Order already cancelled" });
  }

  const today = new Date().toISOString().split("T")[0];
  if (order.createdAt !== today) {
    return res.status(400).json({ error: "Cancellation not allowed after today" });
  }

  order.status = "cancelled";
  const product = req.db.data.products.find(p => p.id === order.productId);
  product.stock += order.quantity;

  await req.db.write();
  res.status(200).json(order);
});

// Change Order Status
router.patch("/change-status/:orderId", async (req, res) => {
  const orderId = parseInt(req.params.orderId);
  const order = req.db.data.orders.find(o => o.id === orderId);

  if (!order) return res.status(404).json({ error: "Order not found" });
  if (order.status === "cancelled" || order.status === "delivered") {
    return res.status(400).json({ error: "Cannot change status" });
  }

  const validFlow = { placed: "shipped", shipped: "delivered" };
  order.status = validFlow[order.status] || order.status;

  await req.db.write();
  res.status(200).json(order);
});

module.exports = router;
