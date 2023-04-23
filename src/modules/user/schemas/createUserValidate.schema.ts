import Joi from 'joi';

export const createUserValidateSchema = () => {
  return Joi.object({
    email: Joi.string().email().max(64).required(),
    password: Joi.string().min(8),
  });
};
