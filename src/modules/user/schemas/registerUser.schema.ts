import Joi from 'joi';

export const registerUserSchema = Joi.object({
  email: Joi.string().email().max(64).required(),
  password: Joi.string().min(8).required(),
  name: Joi.string().required(),
  contacts: Joi.string().required(),
});
