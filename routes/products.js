const express = require("express");
const productsServices = require("../services/products.services");
const validatorHandler = require("../middleware/validator.handler");
const validateJWT = require("../middleware/auth.handler");
const {
  schemaProductCreate,
  schemaProductId,
  schemaProducsByType,
  schemaProductUpdate
} = require("../schemas/product.schema");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await productsServices.getAllProducts(req, res);
    return products;
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  validatorHandler(schemaProductId, "params"),
  async (req, res) => {
    const getOneProduct = await productsServices.getOneProduct(req, res);
    return getOneProduct;
  }
);

router.get(
  "/byType/:id",
  validatorHandler(schemaProducsByType, "params"),
  async (req, res) => {
    const getProductsByType = await productsServices.getProductsByType(req, res);
    return getProductsByType;
  }
);

router.post(
  "/",
  validateJWT,
  validatorHandler(schemaProductCreate, "body"),
  async (req, res) => {
    const createNewProduct = await productsServices.createNewProduct(req, res);
    return createNewProduct;
  }
);

router.put(
  "/:id",
  validateJWT,
  validatorHandler(schemaProductId, "params"),
  validatorHandler(schemaProductUpdate, "body"),
  async (req, res) => {
    const updateProduct = await productsServices.updateProduct(req, res);
    return updateProduct;
  }
);

module.exports = router;
