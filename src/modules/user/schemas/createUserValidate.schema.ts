import Joi from 'joi';

export const createUserValidateSchema = () => {
  return Joi.object({
    name: Joi.string().min(3).max(255).required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().min(1).required(),
    step: Joi.number().min(1).required(),
    endDate: Joi.date().iso().greater('now'),
  });
};
