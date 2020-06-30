const express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.json({
    status: 'running',
    url: req.url
  });
});

module.exports = router;
