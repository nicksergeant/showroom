var React = require('react');
var Router = require('react-router');

var Link = Router.Link;

module.exports = React.createClass({
  render: function() {
    return (
      <Link className="large-4 small-4 columns" to="vehicle" params={{ make: this.props.vehicle.defaultStyle.make.niceName, model: this.props.vehicle.niceName }}>
        <div className="vehicle">
          <img src="http://420placehold.it/cars/600-400-2" />
          <div className="vehicle-details">
            <h2>{this.props.vehicle.defaultStyle.year.year} {this.props.vehicle.fullName}</h2>
          </div>
        </div>
      </Link>
    );
  }
});
