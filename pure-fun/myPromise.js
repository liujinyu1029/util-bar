const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

const resolutionProducer = (promise, x, resolve, reject) => {
  if (promise === x) reject(new TypeError('循环引用'));
  if (x && ['object', 'function'].includes(typeof x)) {
    let called = false;
    try {
      const then = x.then;
      if (typeof then === 'function') {
        const resolvePromise = (y) => {
          if (called) return;
          called = true;
          resolutionProducer(promise, y, resolve, reject);
        };
        const rejectPromise = (r) => {
          if (called) return;
          called = true;
          reject(r);
        };
        then.call(x, resolvePromise, rejectPromise);
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
};

class MyPromise {
  constructor(executor) {
    this.value = null;
    this.reason = null;
    this.state = PENDING;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    executor(this.resolve.bind(this), this.reject.bind(this));
  }
  resolve(value) {
    if (this.state === PENDING) {
      this.state = FULFILLED;
      this.value = value;
      while (this.onFulfilledCallbacks.length) {
        this.onFulfilledCallbacks.shift()(value);
      }
    }
  }
  reject(reason) {
    if (this.state === PENDING) {
      this.state = REJECTED;
      this.reason = reason;
      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()(reason);
      }
    }
  }
  then(onFulfilled, onRejected) {
    const isFulfilled = typeof onFulfilled === 'function';
    const isRejected = typeof onRejected === 'function';
    const promise2 = new MyPromise((resolve, reject) => {
      const fulfilledMicrotask = () => {
        if (isFulfilled) {
          queueMicrotask(() => {
            try {
              const x = onFulfilled(this.value);
              resolutionProducer(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        } else {
          resolve(this.value);
        }
      };
      const rejectedMicrotask = () => {
        if (isRejected) {
          queueMicrotask(() => {
            try {
              const x = onRejected(this.reason);
              resolutionProducer(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        } else {
          reject(this.reason);
        }
      };
      if (this.state === FULFILLED) {
        fulfilledMicrotask();
      } else if (this.state === REJECTED) {
        rejectedMicrotask();
      } else if (this.state === PENDING) {
        this.onFulfilledCallbacks.push(fulfilledMicrotask);
        this.onRejectedCallbacks.push(rejectedMicrotask);
      }
    });
    return promise2;
  }
}

MyPromise.deferred = () => {
  const result = {};
  result.promise = new MyPromise((resolve, reject) => {
    result.resolve = resolve;
    result.reject = reject;
  });
  return result;
};

MyPromise.promisify = (fn) => {
  return (...args) => {
    return new MyPromise((resolve, reject) => {
      args.push((error, data) => {
        if (error) reject(error);
        resolve(data);
      });
      fn.apply(null, args);
    });
  };
};

module.exports = MyPromise;
