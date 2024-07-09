import { HttpCode } from '../../constants.js';

export const logNotFoundMiddleware = (logger) => (req, res) => {
  res.status(HttpCode.NOT_FOUND).send('Not found');
  logger.error(`Route not found: ${req.url}`);
};
