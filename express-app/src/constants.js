export const API_PREFIX = '/api';

export const BACK_PORT = Number.parseInt(process.env.BACK_PORT, 10) || 3000;

export const DEFAULT_COMMAND = '--help';

export const ExitCode = {
  SUCCESS: 0,
  ERROR: 1,
};

export const FRONT_PORT = Number.parseInt(process.env.FRONT_PORT, 10) || 8080;

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

export const USER_ARGV_INDEX = 2;
