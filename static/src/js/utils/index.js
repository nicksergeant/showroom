var Q = require('q');

module.exports = {
  request: function(url, plainText) {
    var deferred = Q.defer();
    var req = new XMLHttpRequest();
    req.onload = function() {
      deferred.resolve(plainText ? this.responseText : JSON.parse(this.responseText));
    };
    req.open('get', url, true);
    req.send();
    return deferred.promise;
  },
  trackPageVisit: function() {
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
  }
};
