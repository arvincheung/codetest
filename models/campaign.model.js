const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Option = new Schema({
  name: {type: String},
  votes: {type: [String]}
});

const Campaign = new Schema({
  name: {type: String, required: true},
  startTime: {type: Date, required: true},
  endTime: {type: Date, required: true},
  options: {type: [Option]}
});

module.exports = mongoose.model('Campaign', Campaign);
