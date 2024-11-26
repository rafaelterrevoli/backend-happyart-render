const productRoutes = require("../routes/products");
const userRoutes = require("../routes/users");
const typeRoutes = require("../routes/types");
const themeRoutes = require("../routes/themes");
const express = require("express");


function apiRoutes(app) {
  const router = express.Router();
  app.use("/happyart/api/v1", router);
  router.use("/products", productRoutes);
  router.use("/users", userRoutes);
  router.use("/types", typeRoutes);
  router.use("/themes", themeRoutes);
}

module.exports = apiRoutes;
