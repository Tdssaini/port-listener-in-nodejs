const bookshelf = require('../database.js');

var Appointments = bookshelf.Model.extend({
  tableName: 'appointments',
  hasTimestamps: true,
});

module.exports = bookshelf.model('Appointments', Appointments);