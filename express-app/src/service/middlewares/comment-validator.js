import Joi from 'joi';

import { HttpCode } from '../../constants.js';

const MIN_COMMENT_LENGTH = 20;
const MAX_COMMENT_LENGTH = 1000;

const ErrorMessage = {
  TEXT_MIN: `Comment must be at least ${MIN_COMMENT_LENGTH} characters long`,
  TEXT_MAX: `Comment must be at most ${MAX_COMMENT_LENGTH} characters`,
  USER: 'User id is not correct',
  LOT: 'Lot id is not correct',
};

const schema = Joi.object({
  text: Joi.string()
    .min(MIN_COMMENT_LENGTH)
    .max(MAX_COMMENT_LENGTH)
    .required()
    .messages({
      'string.min': ErrorMessage.TEXT_MIN,
      'string.max': ErrorMessage.TEXT_MAX,
    }),
  userId: Joi.number().required().positive().min(1).messages({
    'number.base': ErrorMessage.USER,
  }),
  lotId: Joi.number().required().positive().min(1).messages({
    'number.base': ErrorMessage.LOT,
  }),
});

export const commentValidator = (req, res, next) => {
  const commentData = req.body;
  const { error } = schema.validate(commentData, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((err) => ({
      [err.context.key]: err.message,
    }));

    return res.status(HttpCode.BAD_REQUEST).json(errorMessages);
  }

  next();
};
