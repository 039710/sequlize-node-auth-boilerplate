// Load Env
require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const port = process.env.PORT || 3000;
const router = require('./routes');
const session = require('express-session');
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', router);
// Serve static files
app.use(express.static('public'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // https only if true
}));

// Run Server
app.listen(port, () => {
  console.log(`${process.env.APP_NAME || 'Server'} listening at http://localhost:${port}`);
});

