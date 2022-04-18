const express = require('express');
const router = express.Router();
const apis = require('./apis.js');

//V1 APIs
router.post("/writeHeartRateData",apis.writeHeartRateData);
router.post("/writeOximeterData",apis.writeOximeterData);
module.exports = router;
