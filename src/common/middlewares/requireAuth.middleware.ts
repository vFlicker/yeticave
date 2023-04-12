import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.session.user) {
    const title = 'Forbidden error';

    res.status(StatusCodes.FORBIDDEN);

    return res.render('pages/error', {
      pageTitle: title,
      error: {
        title,
        text: 'Sorry, you do not have permission to access this page.',
      },
    });
  }

  next();
};
