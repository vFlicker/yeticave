import { helpCommand } from './commands/helpCommand.js';
import { versionCommand } from './commands/versionCommand.js';

export const Cli = {
  [helpCommand.name]: helpCommand,
  [versionCommand.name]: versionCommand,
};
