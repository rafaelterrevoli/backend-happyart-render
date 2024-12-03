const Joi = require("joi");

const id = Joi.number().integer().min(0);
const firstname = Joi.string().min(2).max(30);
const lastname = Joi.string().min(2).max(30);
const email = Joi.string().email().min(5).max(40);
const password = Joi.string().min(8).max(30);
const phone = Joi.string().min(9).max(12);
const addresses = Joi.array().min(1);

const schemaUserId = Joi.object({
  id: id.required(),
});

const schemaUserCreate = Joi.object({
  firstname: firstname.required(),
  lastname: lastname.required(),
  email: email.required(),
  password: password.required(),
  phone: phone.required(),
  addresses: addresses.required(),
});

const schemaUserLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  schemaUserId,
  schemaUserCreate,
  schemaUserLogin,
};
