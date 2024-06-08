import { Id } from '../types';

export const LOT_HISTORY_COOKIE_KEY = 'LOT_HISTORY';

export const getLotHistoryCookieKey = (userId: Id) => {
  const key = LOT_HISTORY_COOKIE_KEY + userId;
  return key;
};
