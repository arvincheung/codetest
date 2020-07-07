const express = require('express');
const users = require.main.require('./controllers/user.controller');

var router = express.Router();

router.get('/users', users.findAll);
router.get('/user/:id', users.findOne);

router.post('/user', users.create);
router.post('/user/:id', users.findOneAndUpdate);

module.exports = router;
