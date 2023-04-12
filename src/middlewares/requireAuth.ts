import { NextFunction, Request, Response } from 'express';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.session.user) {
    res.status(403);

    return res.render('pages/error', {
      pageTitle: '403 Forbidden Error',
      error: {
        title: '403 Forbidden Error',
        text: 'Sorry, you do not have permission to access this page.',
      },
    });
  }

  next();
};
