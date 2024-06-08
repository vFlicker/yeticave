import { NextFunction, Request, Response } from 'express';

import { convertDayToMilliseconds, getLotHistoryCookieKey } from '../utils';

export const lotHistoryCookie = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id: lotId } = req.params;
  const { user } = req.session;

  if (user) {
    const { id: userId } = user;
    const key = getLotHistoryCookieKey(userId);
    const expire = Date.now() + convertDayToMilliseconds(30);
    const cookieExpire = new Date(expire);
    let cookieValue = [];

    if (req.cookies[key]) {
      cookieValue = JSON.parse(req.cookies[key]);
    }

    if (!cookieValue.includes(lotId)) {
      cookieValue.push(lotId);
    }

    res.cookie(key, JSON.stringify(cookieValue), {
      expires: cookieExpire,
    });
  }

  next();
};
