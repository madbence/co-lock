var co = require('co');
var lock = require('./');

function sleep(ms) {
  return function(cb) {
    setTimeout(cb, ms);
  };
}

co(function*() {
  console.log('1.1');
  var r1 = yield lock(1);
  console.log('1.2');
  yield sleep(2000);
  var r2 = yield lock(2);
  yield sleep(2000);
  console.log('1.3');
  yield r2;
  yield r1;
  console.log('1.4');
})();

co(function*() {
  console.log('   2.1');
  var r1 = yield lock(2);
  console.log('   2.2');
  yield sleep(2000);
  var r2 = yield lock(1);
  yield sleep(2000);
  console.log('   2.3');
  yield r1;
  yield r2;
  console.log('   2.4');
})();
