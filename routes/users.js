const express = require("express");
const usersServices = require("../services/users.services");
const validatorHandler = require("../middleware/validator.handler");
const validateJWT = require("../middleware/auth.handler");
const {
  schemaUserId,
  schemaUserCreate,
  schemaUserLogin,
} = require("../schemas/user.schema");

const router = express.Router();

router.get(
  "/:id",
  validatorHandler(schemaUserId, "params"),
  validateJWT,
  async (req, res) => {
    const user = await usersServices.getUser(req, res);
    return user;
  }
);

router.post(
  "/",
  validatorHandler(schemaUserCreate, "body"),
  async (req, res) => {
    const createNewUser = await usersServices.createNewUser(req, res);
    return createNewUser;
  }
);

router.post(
  "/login",
  validatorHandler(schemaUserLogin, "body"),
  async (req, res) => {
    const userLogin = await usersServices.userLogin(req, res);
    return userLogin;
  }
);

module.exports = router;
