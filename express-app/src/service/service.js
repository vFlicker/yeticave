import { DEFAULT_COMMAND, ExitCode, USER_ARGV_INDEX } from '../constants.js';
import { Cli } from './cli/cli.js';

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [userCommand] = userArguments;

if (!userArguments.length || !Cli[userCommand]) {
  Cli[DEFAULT_COMMAND].execute();
  process.exit(ExitCode.success);
}

const commandArgs = userArguments.slice(1);
Cli[userCommand].execute(commandArgs);
