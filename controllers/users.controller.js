const User = require.main.require('./models/users.model');

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
