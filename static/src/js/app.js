'use strict';

var Header = require('./header');
var React = require('react');
var Router = require('react-router');
var VehicleDetail = require('./vehicles/detail');
var VehicleList = require('./vehicles/list');

var Link = Router.Link;
var NotFoundRoute = Router.NotFoundRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

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
