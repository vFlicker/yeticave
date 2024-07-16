import chalk from 'chalk';

export const helpCommand = {
  name: '--help',

  execute(_args) {
    const helpText = `
    The program starts an HTTP server and generates a file with data for the API.

    Guide:
      server <command>

      Commands:
      --fill-db:            fills the database with data
      --help:               prints this text
      --version:            outputs the version number
      --server:             starts the server
    `;

    console.log(chalk.yellow(helpText));
  },
};
