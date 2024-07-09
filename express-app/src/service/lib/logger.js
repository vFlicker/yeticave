import pino from 'pino';

import { Env, LOG_FILE, NODE_ENV } from '../../constants.js';

const isDevMode = NODE_ENV === Env.DEVELOPMENT;
const defaultLogLevel = isDevMode ? 'info' : 'error';

export const logger = pino(
  {
    transport: {
      target: 'pino-pretty',
    },
    name: 'base',
    level: defaultLogLevel,
  },
  isDevMode ? process.stdout : pino.destination(LOG_FILE),
);

export const getLogger = (options = {}) => logger.child({ options });
