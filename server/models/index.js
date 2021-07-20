const chalk = require('chalk');
const mongoose = require('mongoose');

// password security with dotenv
require('dotenv').config();

const url = process.env.MONGO_URL_DEV;
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    console.log(chalk.hex('10AA50')('Connected to MongoDB'));
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

module.exports = mongoose;
