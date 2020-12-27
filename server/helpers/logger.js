const chalk = require('chalk');
const formatDate = require('./timeStamp');

module.exports = (req, res, next) => {
  if (req.url.split('/')[3] === 'auth') {
    console.log(chalk.cyanBright(
      `request fired to: '${req.url}', Method: '${req.method}', at: ${formatDate(
        Date.now(),
      )}`,
    ));
  } else {
    console.log(
      `request fired to: '${req.url}', Method: '${req.method}', at: ${formatDate(
        Date.now(),
      )}`,
    );
  }
  next();
};
