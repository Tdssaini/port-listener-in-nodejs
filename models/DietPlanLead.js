const bookshelf = require('../database.js');

var DietPlanLeads = bookshelf.Model.extend({
  tableName: 'diet_plan_leads',
  hasTimestamps: true,
});

module.exports = bookshelf.model('DietPlanLeads', DietPlanLeads);