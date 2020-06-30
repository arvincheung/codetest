const moment = require('moment');
const Campaign = require.main.require('./models/campaigns.model');

module.exports = {
  findAll: (req, res, next) => {
    Campaign.find({}, (err, campaigns) => {
      if(err) return next(err);
      return res.json({
        success: true,
        campaigns
      });
    });
  },
  create: (req, res, next) => {
    var startTime = moment(req.body.startTime);
    if(!startTime.isValid) {
      return next('Invalid format of startTime');
    }
    var endTime = moment(req.body.endTime);
    if(!endTime.isValid) {
      return next('Invalid format of endTime');
    }
    req.body.startTime = startTime;
    req.body.endTime = endTime;

    var campaign = new Campaign(req.body);
    campaign.save((err, rs) => {
      if(err) return next(err);
      res.json({
        success: true,
        campaign
      });
    });
  },
  findOneAndUpdate: (req, res, next) => {
    let _id = req.params.id;
    Campaign.findOneAndUpdate({
      _id
    }, {
      $set: req.body
    }, {
      runValidators: true,
      new: true
    }, (err, campaign) => {
      if(err) return next(err);
      return res.json({
        success: true,
        campaign
      });
    });
  },
  findOne: (req, res, next) => {
    let _id = req.params.id;
    Campaign.findOne({
      _id
    }, (err, campaign) => {
      if(err) return next(err);
      return res.json({
        success: true,
        campaign
      });
    });
  }
}
