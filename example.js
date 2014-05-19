var co = require('co');
var lock = require('./');

var obj = {};

function sleep(ms) {
  return function(cb) {
    setTimeout(cb, ms);
  };
}

function log(n, m) {
  var str = Array(n*3 + 1).join(' ') + n + '.' + m;
  console.log(str);
}

Array(5).join(0).split(0).forEach(function(el, i) {
  co(function*() {
    log(i, 1);
    var release = yield lock(obj);
    log(i, 2);
    yield sleep(2000);
    log(i, 3);
    yield release;
    //log(i, 4);
  })();
})
