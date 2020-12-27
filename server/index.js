/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const chalk = require('chalk');
const app = require('./app');
const authServer = require('./authServer');

const PORT = +process.env.PORT || 8080;
const AUTH_PORT = +PORT + 1;
const URL = process.env.MY_URL || 'http://localhost';
const ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
  console.log(chalk.blueBright(`Server listening at ${URL}:${PORT}`));
  console.log(chalk.blueBright(`Environment: ${ENV}`));
});

authServer.listen(AUTH_PORT, () => {
  console.log(chalk.cyanBright(`Auth server listening at ${URL}:${AUTH_PORT}`));
});
