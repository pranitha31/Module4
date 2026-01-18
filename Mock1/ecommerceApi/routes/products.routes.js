const express = require("express");
const router = express.Router();

// Get all products
router.get("/", (req, res) => {
  res.status(200).json(req.db.data.products);
});

// Add product
router.post("/", async (req, res) => {
  const product = req.body;
  product.id = req.db.data.products.length + 1;
  req.db.data.products.push(product);
  await req.db.write();
  res.status(201).json(product);
});

module.exports = router;
