const express = require('express');
const logger = require('./helpers/logger');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('build'));

app.use(logger);

// get endpoint
app.use('/api', require('./api'));

/// ERRORS SECTION

const unknownEndpointHandler = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

// handler of requests with unknown endpoint
app.use(unknownEndpointHandler);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  // build here your error handler

  next(error);
};

// handler of requests with result to errors
app.use(errorHandler);

module.exports = app;
