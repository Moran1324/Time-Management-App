const express = require('express');
const authErrorHandler = require('./helpers/auth/authErrorHandler');
const logger = require('./helpers/logger');

const app = express();

app.use(express.json());

app.use(logger);

// get endpoint
app.use('/api/v1/auth', require('./api/v1/auth'));

/// ERRORS SECTION

const unknownEndpointHandler = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

// handler of requests with unknown endpoint
app.use(unknownEndpointHandler);

// handler of requests with result to errors
app.use(authErrorHandler);

module.exports = app;
