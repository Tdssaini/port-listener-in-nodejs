'use strict';

const EHRObservation = require('./models/EHRObservation.js');
const DeviceData = require('./models/DeviceData.js');


class Utils{
    
    static async validateAndSendDataToSalesforce(){
        var devicesData = [];
        await DeviceData.where('synced',false)
        .fetchAll()
        .then((lDevicesData) => {
          devicesData = lDevicesData;
        })
        .catch((err) => {
          console.log(err);
          devicesData = undefined;
        });
        if(devicesData != undefined && devicesData.length > 0){
          console.log('Running a job to verify & push devices data..');
          for(var i=0;i<devicesData.length;i++){
            var deviceDataToInsert = devicesData.models[i].attributes;
            await EHRObservation.forge({
                healthcloudga__account__c : deviceDataToInsert.userAccountId,
                healthcloudga__device__c : deviceDataToInsert.deviceId,
                data_recorded__c : deviceDataToInsert.sensorData,
                healthcloudga__sourcesystem__c : "IOT Sensor - "+deviceDataToInsert.deviceType
            }).save();
            await devicesData.models[i].save({
                synced: true,
            });
          }
        }else{
          console.log('No new device data found...');
        }
    }

    static isDataValid(dataValue,deviceType){
        //Device Type is Heart Beat Sensor
        if(deviceType === "Heart Beat Sensor"){
            if(dataValue > 60 && dataValue < 100){
                return true;
            }
        }
        //Device Type is Pulse Oximemter
        else if(deviceType === "Pulse Oximemter"){
            if(dataValue < 100){
                return true;
            }
        }
    }

}

module.exports = Utils;