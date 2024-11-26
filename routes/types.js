const express = require("express");
const validatorHandler = require("../middleware/validator.handler");
const typesServices = require("../services/type.services");
const validateJWT = require("../middleware/auth.handler");
const { schemaTypeCreate } = require("../schemas/type.schema");

const router = express.Router();

router.get("/allTypes", async (req, res) => {
  try {
    const allTypes = await typesServices.getAllTypes(req, res);
    return allTypes;
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  validateJWT,
  validatorHandler(schemaTypeCreate, "body"),
  async (req, res) => {
    const createNewType = await typesServices.createNewType(req, res);
    return createNewType;
  }
);

module.exports = router;
