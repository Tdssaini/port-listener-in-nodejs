const bookshelf = require('../database.js');

var DeviceData = bookshelf.Model.extend({
  tableName: 'device_data',
  hasTimestamps: true,
});

module.exports = bookshelf.model('DeviceData', DeviceData);