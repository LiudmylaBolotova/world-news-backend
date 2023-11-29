const Joi = require("joi");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+\d{1,4}\d{6,}$/;

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().regex(emailRegex).required(),
  phone: Joi.string().regex(phoneRegex).required(),
});

module.exports = {
  addSchema,
};