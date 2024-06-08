import { NextFunction, Request, Response } from 'express';

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.session.user) {
    res.locals.isAuth = true;
    res.locals.user = req.session.user;
  } else {
    res.locals.isAuth = false;
    res.locals.user = null;
  }

  next();
};
