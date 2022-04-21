const DeviceData = require('./models/DeviceData.js');
const Utils = require('./utils.js');

module.exports = {

  writeSensorData: async function(req,res){
    if(Utils.isDataValid(req.body.sensorData,req.body.deviceType)){
      var returnData = await DeviceData.forge({
        deviceId: req.body.deviceId,
        userAccountId: req.body.userAccountId,
        deviceType : req.body.deviceType,
        sensorData: req.body.sensorData,
        synced: false
      }).save();
      res.json({'status':'success','data' : returnData});
    }else{
      res.json({'status':'error','data' : "Invalid Data"});
    }
  }

}
