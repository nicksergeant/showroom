var React = require('react');

module.exports = React.createClass({
  componentDidMount: function() {
    if (window.innerWidth > 924) {
      document.getElementById('query').focus();
    }
  },
  render: function() {
    return (<input name="q" id="query" type="text" onChange={this.props.onSearch} value={this.props.query} />);
  }
});
