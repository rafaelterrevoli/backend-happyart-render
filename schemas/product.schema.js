const Joi = require("joi");

const id = Joi.number().integer().min(0);
const description = Joi.string().min(3).max(250);
const price = Joi.number().integer().min(2);
const stock = Joi.number().integer().min(0);
const other_attributes = Joi.object().min(1);
const img = Joi.array().items(Joi.string()).min(1);
const type_id = Joi.number().integer().min(1);
const theme_id = Joi.number().integer().min(1);

const schemaProductCreate = Joi.object({
  description: description.required(),
  price: price.required(),
  stock: stock.required(),
  other_attributes: other_attributes.required(),
  img: img.required(),
  type_id: type_id.required(),
  theme_id: theme_id.required(),
});

const schemaProductUpdate = Joi.object({
  description: description.required(),
  price: price.required(),
  stock: stock.required(),
  other_attributes: other_attributes.required(),
  img: img.required(),
  type_id: type_id.required(),
  theme_id: theme_id.required(),
});

const schemaProductId = Joi.object({
  id: id.required()
});

const schemaProducsByType = Joi.object({
  id: id.required()
});

module.exports = {
  schemaProductCreate,
  schemaProductId,
  schemaProducsByType,
  schemaProductUpdate
};
