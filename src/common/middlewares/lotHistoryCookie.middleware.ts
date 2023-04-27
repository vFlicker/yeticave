import { NextFunction, Request, Response } from 'express';

import { LOT_HISTORY_COOKIE_KEY } from '../constants';
import { convertDayToMilliseconds } from '../utils';

// TODO: now for each user we have the same history. Fix it.
export const lotHistoryCookie = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  const expire = Date.now() + convertDayToMilliseconds(30);
  const cookieExpire = new Date(expire);
  let cookieValue = [];

  if (req.cookies[LOT_HISTORY_COOKIE_KEY]) {
    cookieValue = JSON.parse(req.cookies[LOT_HISTORY_COOKIE_KEY]);
  }

  if (!cookieValue.includes(id)) {
    cookieValue.push(id);
  }

  res.cookie(LOT_HISTORY_COOKIE_KEY, JSON.stringify(cookieValue), {
    expires: cookieExpire,
  });

  next();
};
