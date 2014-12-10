var Q = require('q');
var utils = require('../utils');

module.exports = {
  data: [],
  order: function(vehicles) {
    vehicles.sort(function(a, b) {
      return new Date(b.publish_date) - new Date(a.publish_date);
    });
    return vehicles;
  },
  collection: function() {
    if (this.data.length) return Q.when(this.data);
    return utils.request('/api/vehicles').then(function(vehicles) {
      this.data = this.order(vehicles);
    }.bind(this));
  }
};
