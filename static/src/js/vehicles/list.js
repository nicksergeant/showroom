var React = require('react');
var Router = require('react-router');
var Search = require('../search');
var utils = require('../utils');
var VehicleInList = require('../vehicles/in-list');
var Vehicles = require('../vehicles/service');

module.exports = React.createClass({
  mixins: [ Router.Navigation, Router.State ],
  componentDidMount: function() {
    Vehicles.collection().then(function() {
      document.title = 'Showroom';
      utils.trackPageVisit();
      this.setState({ vehicles: Vehicles.data });
    }.bind(this));
    var query = this.getQuery().q;
    if (query) {
      this.setState({ query: query });
    }
  },
  componentDidUpdate: function() {
    if (!this.getQuery().q && this.state.query) {
      this.setState({ query: null });
      if (window.innerWidth > 924) {
        document.getElementById('query').focus();
      }
    }
  },
  getInitialState: function() {
    return { vehicles: [] };
  },
  filterVehicles: function(vehicles) {
    var query = this.state.query;
    if (query) {
      vehicles = vehicles.filter(function(vehicle) {
        return vehicle.fullName.toLowerCase().indexOf(query) !== -1;
      });
    }
    return vehicles;
  },
  onSearch: function(event) {
    var query = event.target.value.toLowerCase();
    this.setState({ query: query });
    this.replaceWith('list', {}, query ? { q: query } : null);
  },
  render: function() {
    var vehicles = this.filterVehicles(this.state.vehicles);
    var vehicleNodes = vehicles.map(function(vehicle) {
      return (<VehicleInList key={vehicle.id} vehicle={vehicle} />);
    });
    return (
      <div>
        <Search onSearch={this.onSearch} query={this.state.query} />
        <ul>{vehicleNodes}</ul>
      </div>
    );
  }
});
