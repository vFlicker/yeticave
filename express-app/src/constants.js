export const DEFAULT_COMMAND = '--help';

export const API_PORT = Number.parseInt(process.env.API_PORT, 10) || 3000;

export const USER_ARGV_INDEX = 2;

export const ExitCode = {
  SUCCESS: 0,
  ERROR: 1,
};

export const HttpCode = {
  OK: 200,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
