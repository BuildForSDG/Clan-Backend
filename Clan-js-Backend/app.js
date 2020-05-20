const express = require('express');
const bodyParser = require('body-parser');

const DB = require('./middlewares/DB');
const userRoute = require('./routes/user');

const app = express();

app.use(DB.connect);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  next();
});

app.use(bodyParser.json());


// API Routes goes here
app.use('/auth', userRoute);

module.exports = app;
