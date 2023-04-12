import { NextFunction, Request, Response } from 'express';

import { convertDayToMilliseconds, LOT_HISTORY_COOKIE } from '../common';

export const createLotHistoryCookie = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  const expire = Date.now() + convertDayToMilliseconds(30);
  const cookieExpire = new Date(expire);
  let cookieValue = [];

  if (req.cookies[LOT_HISTORY_COOKIE]) {
    cookieValue = JSON.parse(req.cookies[LOT_HISTORY_COOKIE]);
  }

  if (!cookieValue.includes(id)) {
    cookieValue.push(id);
  }

  res.cookie(LOT_HISTORY_COOKIE, JSON.stringify(cookieValue), {
    expires: cookieExpire,
  });

  next();
};
