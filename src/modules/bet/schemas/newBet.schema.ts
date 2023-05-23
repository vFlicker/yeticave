import Joi from 'joi';

export const newBetSchema = (minPrice: number) => {
  return Joi.object({
    price: Joi.number().min(minPrice).required(),
    lotId: Joi.string().required(),
  });
};
