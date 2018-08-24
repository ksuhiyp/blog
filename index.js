const express = require('express');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var compression = require('compression')
const passport = require('passport');
const db = require('./config/db');
const morgan = require('morgan');
const errorHandler = require('./errorHandler');

const app = express();
app.use(compression())
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use('/articles', require('./routes/article'));
app.use('/users', require('./routes/user'));
app.use(errorHandler.errorHandler);
module.exports = app;
