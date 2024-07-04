import chalk from 'chalk';

export const helpCommand = {
  name: '--help',

  execute(_args) {
    const helpText = `
    The program starts an HTTP server and generates a file with data for the API.

    Guide:
      server <command>

      Commands:
      --version:            outputs the version number
      --help:               prints this text
      --generate <count>    generates the mocks.json file
    `;

    console.log(chalk.gray(helpText));
  },
};
