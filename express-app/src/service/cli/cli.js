import { helpCommand } from './commands/help-command.js';
import { serverCommand } from './commands/server-command.js';
import { versionCommand } from './commands/version-command.js';

export const Cli = {
  [helpCommand.name]: helpCommand,
  [serverCommand.name]: serverCommand,
  [versionCommand.name]: versionCommand,
};
