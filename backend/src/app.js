const express = require('express');
const cookieParser = require('cookie-parser');
const corsMiddleware = require('./middleware/cors');
const routes = require('./routes');
const errorHandler = require('./middleware/errorhandler'); //
const logger = require('./utils/logger');

const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  logger.logRequest(req);
  next();
});

app.get('/', (req, res) => {
  res.json({ message: 'Electro-Hub API is running!' });
});

app.use('/api', routes);

app.use(errorHandler);

module.exports = app;
