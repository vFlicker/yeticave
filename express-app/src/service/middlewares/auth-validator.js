import Joi from 'joi';

import { HttpCode } from '../../constants.js';

const ErrorAuthMessages = {
  EMAIL_INVALID: 'Email must be a valid email',
  PASSWORD: 'Password is required',
};

const schema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': ErrorAuthMessages.EMAIL_INVALID,
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': ErrorAuthMessages.PASSWORD,
  }),
});

export const authValidator = async (req, res, next) => {
  const userData = req.body;
  const { error } = schema.validate(userData, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((err) => ({
      [err.context.key]: err.message,
    }));

    return res.status(HttpCode.BAD_REQUEST).json(errorMessages);
  }

  next();
};
