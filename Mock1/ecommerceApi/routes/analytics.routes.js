const express = require("express");
const router = express.Router();

// All Orders with Count
router.get("/allorders", (req, res) => {
  const orders = req.db.data.orders;
  const count = orders.length;
  res.status(200).json({ count, orders });
});

// Cancelled Orders
router.get("/cancelled-orders", (req, res) => {
  const cancelled = req.db.data.orders.filter(o => o.status === "cancelled");
  res.status(200).json({ count: cancelled.length, cancelled });
});

// Shipped Orders
router.get("/shipped", (req, res) => {
  const shipped = req.db.data.orders.filter(o => o.status === "shipped");
  res.status(200).json({ count: shipped.length, shipped });
});

// Total Revenue by Product
router.get("/total-revenue/:productId", (req, res) => {
  const productId = parseInt(req.params.productId);
  const product = req.db.data.products.find(p => p.id === productId);
  if (!product) return res.status(404).json({ error: "Product not found" });

  const revenue = req.db.data.orders
    .filter(o => o.productId === productId && o.status !== "cancelled")
    .reduce((sum, o) => sum + o.quantity * product.price, 0);

  res.status(200).json({ productId, totalRevenue: revenue });
});

// Overall Revenue
router.get("/alltotalrevenue", (req, res) => {
  const revenue = req.db.data.orders
    .filter(o => o.status !== "cancelled")
    .reduce((sum, o) => {
      const product = req.db.data.products.find(p => p.id === o.productId);
      return sum + (product.price * o.quantity);
    }, 0);

  res.status(200).json({ totalRevenue: revenue });
});

module.exports = router;
