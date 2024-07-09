export const logRequestMiddleware = (logger) => (req, res, next) => {
  logger.info(`Start request to url ${req.url}`);
  res.on('finish', () => {
    logger.info(
      `End request to url ${req.url} with status code ${res.statusCode}`,
    );
  });
  next();
};
