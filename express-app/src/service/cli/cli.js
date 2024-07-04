import { helpCommand } from './commands/helpCommand.js';
import { serverCommand } from './commands/serverCommand.js';
import { versionCommand } from './commands/versionCommand.js';

export const Cli = {
  [helpCommand.name]: helpCommand,
  [serverCommand.name]: serverCommand,
  [versionCommand.name]: versionCommand,
};
