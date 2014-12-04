'use strict';

var moment = require('moment');
var React = require('react');
var Router = require('react-router');
var Q = require('q');

var Link = Router.Link;
var NotFoundRoute = Router.NotFoundRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var request = function(url, plainText) {
  var deferred = Q.defer();
  var req = new XMLHttpRequest();
  req.onload = function() {
    deferred.resolve(plainText ? this.responseText : JSON.parse(this.responseText));
  };
  req.open('get', url, true);
  req.send();
  return deferred.promise;
}
var trackPageVisit = function() {
  if (window._gauges) return _gauges.push(['track']);
  window._gauges = [];
  (function() {
    var t   = document.createElement('script');
    t.type  = 'text/javascript';
    t.async = true;
    t.id    = 'gauges-tracker';
    t.setAttribute('data-site-id', '4f51599cf5a1f5084700000b');
    t.src = '//secure.gaug.es/track.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(t, s);
  })();
};

var Vehicles = {
  data: [],
  order: function(vehicles) {
    vehicles.sort(function(a, b) {
      return new Date(b.publish_date) - new Date(a.publish_date);
    });
    return vehicles;
  },
  collection: function() {
    if (this.data.length) return Q.when(this.data);
    return request('/api/vehicles').then(function(vehicles) {
      this.data = this.order(vehicles);
    }.bind(this));
  }
};

var App = React.createClass({
  render: function() {
    return (
      <div>
        <Header />
        <RouteHandler />
      </div>
    );
  }
});
var Header = React.createClass({
  mixins: [ Router.State ],
  render: function() {
    return (
      <header>
        <h1>
          <Link to="list">Showroom</Link>
        </h1>
      </header>
    );
  }
});
var PageNotFound = React.createClass({
  render: function() {
    document.title = '404 - Showroom';
    return (
      <div>
        <p>404: Page not found.</p>
        <p>Go <Link to="/">home</Link> or ask <a href="https://twitter.com/showrm">@showrm</a> on Twitter.</p>
      </div>
    );
  }
});
var VehicleDetail = React.createClass({
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
      trackPageVisit();
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
var VehicleInList = React.createClass({
  render: function() {
    return (
      <li>
        <Link to="vehicle" params={{ make: this.props.vehicle.defaultStyle.make.niceName, model: this.props.vehicle.niceName }}>
          <span>
            {this.props.vehicle.defaultStyle.year.year} {this.props.vehicle.fullName}
          </span>
        </Link>
      </li>
    );
  }
});
var VehicleList = React.createClass({
  mixins: [ Router.Navigation, Router.State ],
  componentDidMount: function() {
    Vehicles.collection().then(function() {
      document.title = 'Showroom';
      trackPageVisit();
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
var Search = React.createClass({
  componentDidMount: function() {
    if (window.innerWidth > 924) {
      document.getElementById('query').focus();
    }
  },
  render: function() {
    return (<input name="q" id="query" type="text" onChange={this.props.onSearch} value={this.props.query} />);
  }
});

var routes = (
  <Route handler={App}>
    <Route path="/" handler={VehicleList} name="list" />
    <Route path="/:make/:model/?" handler={VehicleDetail} name="vehicle" />
    <NotFoundRoute handler={PageNotFound} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, function(Handler, state) {
  React.render(<Handler params={state.params} query={state.query} />, document.getElementById('app'));
});
