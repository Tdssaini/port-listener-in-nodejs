const Patient = require('./models/Patient.js');
const DietPlanLeads = require("./models/DietPlanLead.js");

module.exports = {

  writeHeartRateData: async function(req,res){
    var returnData = await Patient.forge({
      deviceId: req.body.deviceId,
      userId: req.body.userId,
      email: req.body.heartRate,
      beatsPerMinute: req.body.beatsPerMinute
    }).save();
    res.json({'status':'success','data' : returnData});
  },
  writeOximeterData : async function(req,res){
    try{
      var returnData = await Patient.forge({
        deviceId: req.body.deviceId,
        userId: req.body.userId,
        email: req.body.heartRate,
        beatsPerMinute: req.body.beatsPerMinute
      }).save();
      res.json({'status':'success'});
    }catch(e){
      console.log(e);
      res.json({'status':'error'});
    }
  }
}
