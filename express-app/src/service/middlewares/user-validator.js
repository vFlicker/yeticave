import Joi from 'joi';

import { HttpCode } from '../../constants.js';

const ErrorMessage = {
  USERNAME: 'Username is required',
  EMAIL_INVALID: 'Email must be a valid email',
  EMAIL_EXIST: 'User with this email already exists',
  PASSWORD: 'Password is required',
  MIN_PASSWORD_LENGTH: 'Password must be at least 6 characters long',
  PASSWORD_CONFIRM: 'Passwords must match',
};

const schema = Joi.object({
  username: Joi.string().required().messages({
    'any.required': ErrorMessage.USERNAME,
  }),
  email: Joi.string().email().required().messages({
    'string.email': ErrorMessage.EMAIL_INVALID,
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': ErrorMessage.MIN_PASSWORD_LENGTH,
    'any.required': ErrorMessage.PASSWORD,
  }),
  passwordConfirm: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': ErrorMessage.PASSWORD_CONFIRM,
  }),
});

export const userValidator = (userService) => async (req, res, next) => {
  const userData = req.body;
  const { error } = schema.validate(userData, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((err) => ({
      [err.context.key]: err.message,
    }));

    return res.status(HttpCode.BAD_REQUEST).json(errorMessages);
  }

  const foundUser = await userService.findByEmail(userData.email);
  if (foundUser) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .json({ message: ErrorMessage.EMAIL_EXIST });
  }

  next();
};
