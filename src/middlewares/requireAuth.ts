import { NextFunction, Request, Response } from 'express';

import { ROOT_PREFIX } from '../common';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.session.user) return res.redirect(ROOT_PREFIX);
  next();
};
