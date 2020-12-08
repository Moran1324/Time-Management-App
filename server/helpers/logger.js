const formatDate = require('./timeStamp');

module.exports = (req, res, next) => {
  console.log(
    `request fired to: '${req.url}', Method: '${req.method}', at: ${formatDate(
      Date.now(),
    )}`,
  );
  next();
};
