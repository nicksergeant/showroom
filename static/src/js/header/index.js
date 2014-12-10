var React = require('react');
var Router = require('react-router');

var Link = Router.Link;

module.exports = React.createClass({
  mixins: [ Router.State ],
  render: function() {
    return (
      <header id="main-header">
        <div className="row">
          <div className="large-12 columns">
            <Link to="list"><h1 className="hide-text">Showroom</h1></Link>
          </div>
        </div>
      </header>
    );
  }
});
