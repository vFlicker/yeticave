export const API_PREFIX = '/api';

export const BACKEND_PORT =
  Number.parseInt(process.env.BACKEND_PORT, 10) || 3000;

export const DB_FILE = process.env.DB_FILE || 'yeticave.sqlite';

export const DEFAULT_COMMAND = '--help';

export const Env = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
};

export const ExitCode = {
  SUCCESS: 0,
  ERROR: 1,
};

export const FRONTEND_PORT =
  Number.parseInt(process.env.FRONTEND_PORT, 10) || 8080;

export const HttpCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const LOG_FILE = process.env.LOG_FILE || 'logs/api.log';

export const NODE_ENV = process.env.NODE_ENV || 'development';

export const USER_ARGV_INDEX = 2;
