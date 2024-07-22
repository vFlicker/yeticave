import Joi from 'joi';

import { HttpCode } from '../../constants.js';

const schema = Joi.object({
  categoryId: Joi.number().integer().min(1),
  lotId: Joi.number().integer().min(1),
});

export const routeParamsValidation = (req, res, next) => {
  const { error } = schema.validate(req.params);

  if (error) {
    const errorMessages = error.details.map((err) => ({
      [err.context.key]: err.message,
    }));

    return res.status(HttpCode.BAD_REQUEST).json(errorMessages);
  }

  next();
};
