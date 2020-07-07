const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  'name': {type: String, required: true},
  'hkid': {type: String, required: true, unique: true}
});

module.exports = mongoose.model('User', User);
