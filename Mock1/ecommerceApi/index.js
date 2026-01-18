const express = require("express");
const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");

const productsRouter = require("./routes/products.routes");
const ordersRouter = require("./routes/orders.routes");
const analyticsRouter = require("./routes/analytics.routes");

const app = express();
app.use(express.json());

const adapter = new JSONFile("db.json");
const db = new Low(adapter);

async function startServer() {
  await db.read();
  db.data ||= { products: [], orders: [] };

  app.use((req, res, next) => {
    req.db = db;
    next();
  });

  app.use("/products", productsRouter);
  app.use("/orders", ordersRouter);
  app.use("/analytics", analyticsRouter);

  const PORT = 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

startServer();
