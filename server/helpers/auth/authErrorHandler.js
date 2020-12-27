const chalk = require('chalk');

module.exports = (error, request, response, next) => {
  console.error(chalk.redBright('error handler'));
  console.error(chalk.yellow(error.message, error.code));

  const errors = {};

  // build here your error handler
  if (error.message.startsWith('E11000 duplicate key error collection')) return response.status(400).json({ message: 'I know where you live' });

  next(error);
};
