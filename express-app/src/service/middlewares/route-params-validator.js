import Joi from 'joi';

import { HttpCode } from '../../constants.js';

const schema = Joi.object({
  categoryId: Joi.number().integer().min(1),
  lotId: Joi.number().integer().min(1),
});

export const routeParamsValidation = (req, res, next) => {
  const { error } = schema.validate(req.params);

  if (error) {
    const errorText = error.details.map((err) => err.message).join(`\n`);
    res.status(HttpCode.BAD_REQUEST).json(errorText);
    return;
  }

  next();
};
