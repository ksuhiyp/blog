#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../index');
var debug = require('debug')('blog:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);



