export const logServerErrorMiddleware = (logger) => {
  return (err, _req, _res, _next) => {
    logger.error(`An error occurred on processing request: ${err.message}`);
  };
};
