// INITIAL VARS
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var localStrategy = require('passport-local');
var mongoose = require('mongoose');
var adminModel = require('./models/admin.js');
var contactModel = require('./models/contact.js');
var defaultModel = require('./models/default.js');

// DATABASE VARS
var mongoURI = 'mongodb://localhost/duplexdb';
var mongoDB = mongoose.connect(mongoURI).connection;

// SET PORT
app.set('port', (process.env.PORT) || 5000);

// SET MIDDLEWARE
