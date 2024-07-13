import { fillDatabaseCommand } from './commands/fill-database-command.js';
import { helpCommand } from './commands/help-command.js';
import { serverCommand } from './commands/server-command.js';
import { versionCommand } from './commands/version-command.js';

export const Cli = {
  [fillDatabaseCommand.name]: fillDatabaseCommand,
  [helpCommand.name]: helpCommand,
  [serverCommand.name]: serverCommand,
  [versionCommand.name]: versionCommand,
};
