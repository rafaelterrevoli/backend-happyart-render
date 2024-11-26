const express = require("express");
const validatorHandler = require("../middleware/validator.handler");
const themesServices = require("../services/themes.services");
const validateJWT = require("../middleware/auth.handler");
const { schemaThemeCreate } = require("../schemas/theme.schema");

const router = express.Router();

router.get("/allThemes", async (req, res) => {
  try {
    const allThemes = await themesServices.getAllThemes(req, res);
    return allThemes;
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  validateJWT,
  validatorHandler(schemaThemeCreate, "body"),
  async (req, res) => {
    const createNewTheme = await themesServices.createNewTheme(req, res);
    return createNewTheme;
  }
);

module.exports = router;
