const http = require('http');
const express = require('express');
const async = require('async');
const morgan = require('morgan');
const fs = require('fs');
const assert = require('assert');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

var app = express();
var server = http.Server(app);
var io = require('socket.io')(server);

const config = require('./config');
const db = require('./db');


// check directories
fs.existsSync(config.logdir) || fs.mkdirSync(config.logdir);



// middlewares
app.use(morgan('dev'));
// app.use(morgan('combined'))
app.use(bodyParser.json());

// Routers
app.use('/api/v1', [
  require('./routes/campaigns.route'),
  require('./routes')
]);

// 404
app.use((req, res, next) => {
  res.status('404').json({
    message: 'Not found'
  });
});

// error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Internal Server Error',
    err: err.message,
    stack: err.stack
  });
});

mongoose.connect(config.database.url, {useNewUrlParser: true});
// http server
server.listen(config.port, () => {
  console.log(`Server listening on ${config.port}`);
});

setTimeout(() => {
}, 2000);
