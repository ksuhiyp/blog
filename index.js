const express = require('express');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var compression = require('compression')
const passport = require('passport');
const db = require('./config/db');
const morgan = require('morgan');
const articleRouter = require('./routes/article');
const app = express();
app.use(compression())
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use('/articles', require('./routes/article'));
app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(err.status || 406).json({ "Error": err.message });
});
module.exports = app;
