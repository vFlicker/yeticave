import Joi from 'joi';

import { HttpCode } from '../../constants.js';

const ErrorMessage = {
  TITLE_MIN: 'Title must be at least 3 characters long',
  TITLE_MAX: 'Title must be at most 255 characters long',
  DESCRIPTION_MIN: 'Description must be at least 50 characters long',
  DESCRIPTION_MAX: 'Description must be at most 1000 characters long',
  IMAGE: 'Image is not selected or type is not valid',
  STARTING_PRICE: 'Starting price must be at least 1',
  CURRENT_PRICE: 'Current price must be at least 1',
  DATE: 'Date is not selected or type is not valid',
  CATEGORY: 'Category is not selected',
  USER: 'User is not selected',
};

const schema = Joi.object({
  title: Joi.string().min(3).max(255).required().messages({
    'string.min': ErrorMessage.TITLE_MIN,
    'string.max': ErrorMessage.TITLE_MAX,
  }),
  description: Joi.string().min(3).max(255).required().messages({
    'string.min': ErrorMessage.DESCRIPTION_MIN,
    'string.max': ErrorMessage.DESCRIPTION_MAX,
  }),
  imageUrl: Joi.string().uri().required().messages({
    'string.empty': ErrorMessage.IMAGE,
  }),
  startingPrice: Joi.number().min(1).required().messages({
    'number.base': ErrorMessage.STARTING_PRICE,
  }),
  currentPrice: Joi.number().min(1).required().messages({
    'number.base': ErrorMessage.CURRENT_PRICE,
  }),
  finishedAt: Joi.date().required().messages({
    'date.base': ErrorMessage.DATE,
  }),
  categoryId: Joi.number().required().positive().min(1).messages({
    'number.base': ErrorMessage.CATEGORY,
  }),
  userId: Joi.number().required().positive().min(1).messages({
    'number.base': ErrorMessage.USER,
  }),
});

export const lotValidator = (req, res, next) => {
  const lotData = req.body;
  const { error } = schema.validate(lotData, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((err) => err.message);
    return res.status(HttpCode.BAD_REQUEST).json(errorMessages);
  }

  next();
};
