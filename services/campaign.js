const async = require('async');
const mongo = require.main.require('./middlewares/mongo');

module.exports = {
  create: (name, cb) => {
    db.getConn((err, conn) => {
      if(err) return cb(err);

      var campaign = {
        name: name
      };

      conn.campaigns.insertOne(campaign, (err, rs) => {
        if(err) return cb(err);
        conn.close();
        cb();
      });
    });
  },
  findByID: (id, cb) => {
    db.getConn((err, conn) => {
      if(err) return cb(err);
      conn.collection('campaigns').findOne({
        id: id
      }, (err, rs) => {
        return cb(err, rs);
      });
    });
  },
  findAll: (cb) => {
    db.getConn((err, conn) => {
      if(err) return cb(err);
      conn.collection('campaigns').find({}, cb);
    });
  }
};
