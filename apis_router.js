const express = require('express');
const router = express.Router();
const apis = require('./apis.js');

//V1 APIs
router.post("/writeSensorData",apis.writeSensorData);
module.exports = router;
