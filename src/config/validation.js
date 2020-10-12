const Joi = require('joi');
// validation shemas
const postSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  subscription: Joi.string()
    .valid('free', 'pro', 'premium')
    .required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
}).required();

const patchSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/),
  subscription: Joi.string().valid('free', 'pro', 'premium'),
  password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
}).required();

module.exports = {
  postSchema,
  patchSchema,
};
