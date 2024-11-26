const Joi = require("joi");

const name = Joi.object().min(1);

const schemaThemeCreate = Joi.object({
  name: name.required()
});

module.exports = {
  schemaThemeCreate
};
