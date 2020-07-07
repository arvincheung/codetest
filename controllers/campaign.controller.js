const async = require('async');
const moment = require('moment');
const Campaign = require.main.require('./models/campaign.model');
const User = require.main.require('./models/user.model');

module.exports = {
  findAll: (req, res, next) => {
    // return all campaigns sorted by end time then no. of votes
    Campaign
    .find({})
    .sort({ endTime: -1 })
    .exec((err, campaigns) => {
      if(err) return next(err);
      async.each(campaigns, (campaign, cb) => {
        campaign.options.sort((a, b) => {
          if(a.votes.length > b.votes.length) return -1;
          if(a.votes.length < b.votes.length) return 1;
          return 0;
        });
        return cb();
      }, err => {
        if(err) return next(err);
        return res.json({
          success: true,
          campaigns
        });
      });
    });
  },
  create: (req, res, next) => {
    var startTime = moment(req.body.startTime);
    if(!startTime.isValid) {
      return next(new Error('Invalid format of startTime'));
    }
    var endTime = moment(req.body.endTime);
    if(!endTime.isValid) {
      return next(new Error('Invalid format of endTime'));
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
  },
  vote: (req, res, next) => {
    let user_id = req.body.user_id;
    let campaign_id = req.params.id;
    let option_id = req.params.option_id;

    User.findOne({
      _id: user_id
    }, (err, user) => {
      if(err) return next(err);
      if(!user) return next(new Error('User not found'));

      Campaign.findOne({
        _id: campaign_id,
        "options._id": option_id
      }, (err, campaign) => {
        if(err) return next(err);
        if(!campaign) return next(new Error('Campaign or Option not found'));

        // Check start end time
        if(Date.now() < campaign.startTime) return next(new Error('Campaign has not started'));
        if(Date.now() > campaign.endTime) return next(new Error('Campaign already ended'));

        // Check duplicate votes
        async.each(campaign.options, (option, cb) => {
          if(option.votes.indexOf(user_id) >= 0) return cb(new Error('Duplicate vote'));
          if(option._id == option_id) {
            option.votes.push(user_id);
          }
          cb();
        }, err => {
          if(err) return next(err);
          campaign.save(err => {
            if(err) return next(err);
            return res.json({
              success: true,
              campaign: campaign
            });
          });
        });
      });
    });

  }
}
