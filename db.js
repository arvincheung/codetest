const mongoose = require('mongoose');

var db = mongoose.connection;

db.on('error', console.error);

db.once('open', () => {
  console.log('Connected to db');
});

module.exports = db;
