/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const chalk = require('chalk');
const app = require('./app');

const PORT = process.env.PORT || 8080;
const URL = process.env.MY_URL || 'http://localhost';
const ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
  console.log(chalk.blueBright(`Server listening at ${URL}:${PORT}`));
  console.log(chalk.blueBright(`Environment: ${ENV}`));
});
