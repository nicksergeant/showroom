var React = require('react');
var Router = require('react-router');
var utils = require('../utils');
var Vehicles = require('../vehicles/service');

var Link = Router.Link;

module.exports = React.createClass({
  mixins: [ Router.State ],
  componentDidMount: function() {
    this.getVehicle();
  },
  componentDidUpdate: function() {
    if (this.state.triedParams.make !== this.getParams().make &&
        this.state.triedParams.model !== this.getParams().model) {
      this.getVehicle();
    }
  },
  getVehicle: function() {
    this.state.triedParams = this.getParams();
    Vehicles.collection().then(function() {
      var vehicle = Vehicles.data.filter(function(vehicle) {
        return vehicle.defaultStyle.make.niceName === this.getParams().make &&
               vehicle.niceName === this.getParams().model;
      }.bind(this))[0];
      document.title = (vehicle ? vehicle.fullName : '404') + ' - Showroom';
      utils.trackPageVisit();
      this.setState({ vehicle: vehicle });
    }.bind(this));
  },
  getInitialState: function() {
    return { vehicle: {} };
  },
  render: function() {
    var vehicleContent = (
      <a href="#">
        <span>Loading...</span>
      </a>
    );
    if (Vehicles.data.length && this.state.vehicle.id) {
      vehicleContent = (
        <div>
          <Link to="vehicle" params={{ make: this.state.vehicle.defaultStyle.make.niceName, model: this.state.vehicle.niceName }}>
            <span>
              {this.state.vehicle.fullName}
            </span>
          </Link>
          <div>
            <img src={this.state.vehicle.defaultPhoto + '_400.jpg'} />
          </div>
        </div>
      );
    } else if (Vehicles.data.length && !this.state.vehicle) {
      return <PageNotFound />;
    }
    return vehicleContent;
  }
});
