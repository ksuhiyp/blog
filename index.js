const express = require('express');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const compression = require('compression')
const passport = require('passport');
const db = require('./config/db');
const morgan = require('morgan');
const errorHandler = require('./errorHandler');

const app = express();
app.use(compression())
app.use(morgan('tiny'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
app.use('/articles', require('./routes/article'));
app.use('/users', require('./routes/user'));
app.use('/categories', require('./routes/category'));
app.use('/tags', require('./routes/tag'));
app.use(errorHandler.errorHandler);
module.exports = app;
