const bookshelf = require('../database.js');

var EHRObservation = bookshelf.Model.extend({
  tableName: 'salesforce.healthcloudga__ehrobservation__c'
});

module.exports = bookshelf.model('EHRObservations', EHRObservation);