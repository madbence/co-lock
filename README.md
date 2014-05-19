# co-lock

Asynchronous resources, generator style. Finally, Javascript has deadlocks!

## Install

```
$ npm install co-lock
```

## Usage

```js
var release = yield lock(target);
// critical section
yield release;
```

## API

#### lock(target[, timeout])

Creates a lock on `target`, yields with `release` when the lock can be acquired.
If cannot acquire lock within `timeout`, throws error.

Yielding `release` gives control to the next *thread* in the lock's queue.

## License

MIT
