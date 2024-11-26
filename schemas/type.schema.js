const Joi = require("joi");

const name = Joi.string().min(1).max(150);

const schemaTypeCreate = Joi.object({
  name: name.required()
});

module.exports = {
  schemaTypeCreate
};
