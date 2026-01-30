const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  age: Joi.number().integer().min(18).optional(),
  role: Joi.string().optional()
});

module.exports = userSchema;
