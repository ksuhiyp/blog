require('dotenv').config();
const express = require('express');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const compression = require('compression')
const passport = require('./controllers/auth/passport');
const db = require('./config/db');
const morgan = require('morgan');
const errorHandler = require('./helpers/errorHandler');
const cors = require('cors')
const app = express();
app.use(morgan('tiny'));
app.use(cors())
app.use(compression())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(passport.initialize());
app.use('/articles', require('./routes/article'));
app.use('/users', require('./routes/user'));
app.use('/categories', require('./routes/category'));
app.use('/tags', require('./routes/tag'));
app.use(errorHandler.errorHandler);

module.exports = app;
