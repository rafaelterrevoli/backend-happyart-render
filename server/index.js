const productRoutes = require("../routes/products");
const userRoutes = require("../routes/users");
const express = require("express");
//const cors = require("cors");

function apiRoutes(app) {
  const router = express.Router();
  app.use("/happyart/api/v1", router);
  //app.use(cors());
  router.use("/products", productRoutes);
  router.use("/users", userRoutes);
}

module.exports = apiRoutes;
