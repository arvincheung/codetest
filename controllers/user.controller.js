const crypto = require('crypto');

const config = require.main.require('./config');
const User = require.main.require('./models/user.model');

module.exports = {
  findAll: (req, res, next) => {
    User.find({}, (err, users) => {
      if(err) return next(err);
      return res.json({
        success: true,
        users
      });
    });
  },
  create: (req, res, next) => {
    if(!req.body.hkid) return next(new Error('Missing hkid'));
    // encrypt hkid before saving
    req.body.hkid = crypto.createHmac('sha512', config.secret).update(req.body.hkid).digest('base64');
    var user = new User(req.body);
    user.save((err, rs) => {
      if(err) return next(err);
      res.json({
        success: true,
        user
      });
    });
  },
  findOneAndUpdate: (req, res, next) => {
    let _id = req.params.id;
    if(req.body.hkid) {
      // encrypt hkid before saving
      req.body.hkid = crypto.createHmac('sha512', config.secret).update(req.body.hkid).digest('base64');
    }
    User.findOneAndUpdate({
      _id
    }, {
      $set: req.body
    }, {
      runValidators: true,
      new: true
    }, (err, user) => {
      if(err) return next(err);
      return res.json({
        success: true,
        user
      });
    });
  },
  findOne: (req, res, next) => {
    let _id = req.params.id;
    User.findOne({
      _id
    }, (err, user) => {
      if(err) return next(err);
      return res.json({
        success: true,
        user
      });
    });
  }
}
