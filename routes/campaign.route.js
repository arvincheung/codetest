const express = require('express');
const campaigns = require.main.require('./controllers/campaign.controller');

var router = express.Router();

router.get('/campaigns', campaigns.findAll);
router.get('/campaign/:id', campaigns.findOne);

router.post('/campaign', campaigns.create);
router.post('/campaign/:id', campaigns.findOneAndUpdate);

router.post('/campaign/:id/vote/:option_id', campaigns.vote);

module.exports = router;
