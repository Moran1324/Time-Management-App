// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

const {
  DB_USER, DB_PASSWORD, DB_NAME, MY_URL, TEST_DB_NAME,
} = process.env;

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: MY_URL,
    dialect: 'mysql',
    define: {
      underscored: true,
      paranoid: true,
    },
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: TEST_DB_NAME,
    host: MY_URL,
    dialect: 'mysql',
    define: {
      underscored: true,
      paranoid: true,
    },
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
    define: {
      underscored: true,
      paranoid: true,
    },
  },
};
