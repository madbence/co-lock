var locks = [];

function get(resource) {
  for(var i = 0; i < locks.length; i++) {
    if(locks[i].resource === resource) return locks[i];
  }
}

module.exports = function lock(resource, timeout) {
  function release(cb) {
    var _release = function _release(cb) {
      var lock = get(resource);
      if(lock.queue.length) {
        setImmediate(lock.queue.shift(), null, release);
      } else {
        locks.splice(locks.indexOf(lock), 1);
      }
      setImmediate(cb);
      _release = function(cb) {
        setImmediate(cb);
      };
    };
    _release(cb);
  }
  return function thunk(cb) {
    var lock = get(resource);
    if(!lock) {
      lock = {
        resource: resource,
        queue: []
      };
      locks.push(lock);
      setImmediate(cb, null, release);
    } else {
      lock.queue.push(cb);
    }
    if(timeout) {
      setTimeout(function() {
        if(lock.queue.indexOf(cb) !== -1) {
          cb(new Error('Lock timeout!'))
        }
      }, timeout);
    }
  };
};
