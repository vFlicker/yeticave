import Joi from 'joi';

export const createUserSchema = Joi.object({
  email: Joi.string().email().max(64).required(),
  password: Joi.string().min(8),
});
