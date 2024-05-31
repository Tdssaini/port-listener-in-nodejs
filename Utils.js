'use strict';

const { SerialPort,ReadlineParser} = require('serialport');
const axios = require('axios');
const parser = new ReadlineParser()

class Utils{
    
    static async listenToPort(portNumber,baudRate){
      console.log("Listening to "+portNumber+" on "+baudRate);
      const port = new SerialPort({
        path: portNumber,
        baudRate:baudRate ,
        autoOpen: false,
      });
      port.open(function (err) {
        if (err) {
          return console.log('Error opening port: ', err.message)
        }
        port.write('main screen turn on')
      });
      
      port.pipe(parser);
      
      parser.on('data', function (data) {
        try{
          var serialData = JSON.parse(data);
          console.log(serialData);
          axios.post('https://healthcloud-middleware-poc.herokuapp.com/writeSensorData',{
            deviceId : serialData.deviceId,
            userAccountId : serialData.userId,
            deviceType : serialData.deviceType,
            sensorData : serialData.data,
          }).then(resp => {
              console.log(resp.data);
          });
        }catch(e){
          console.log(data);
          port.write("2");
        }
      });
    }
}

module.exports = Utils;