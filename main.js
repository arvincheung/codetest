const http = require('http');
const express = require('express');
const async = require('async');
const morgan = require('morgan');
const fs = require('fs');
const assert = require('assert');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const config = require('./config');
const db = require('./db');

var app = express();
var server = http.Server(app);
var io = require('socket.io')(server, {});
io.adapter(require('socket.io-redis')({
  host: process.env.NODE_ENV == 'prod' ? config.redis.prodUrl : config.redis.url,
  port: config.redis.port
}));

// check directories
fs.existsSync(config.logdir) || fs.mkdirSync(config.logdir);



// middlewares
app.use(morgan('dev'));
// app.use(morgan('combined'))
app.use(bodyParser.json());

// Routers
app.use('/api/v1', [
  require('./routes/campaign.route'),
  require('./routes/user.route'),
  require('./routes')
]);
app.use('/', express.static('public'));

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

// database
mongoose.connect(process.env.NODE_ENV == 'prod' ? config.database.prodUrl : config.database.url, {useNewUrlParser: true});
// http server
server.listen(config.port, () => {
  console.log(`Server listening on ${config.port}`);
});
// Websockets server
require('./sockets')(io);

setTimeout(() => {
}, 2000);
