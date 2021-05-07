require('./app/config/mongo');

const express = require('express');
const bodyParser = require('body-parser');

const store = require('data-store')({ path: process.cwd() + '/shortener.json' });

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const indexRouter = require('./app/routes');

app.use('/v1', indexRouter);

app.listen(3003, function () {
  console.log('express shortener url listening to port 3003');
});