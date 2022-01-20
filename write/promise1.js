const promisesAplusTests = require("promises-aplus-tests");
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function myPromise(executor) {
    let self = this;
    self.status = PENDING;
    self.data = undefined; // Promise的值
    self.onResolvedCallback = []; // myPromise resolve时的回调函数
    self.onRejectedCallback = []; // myPromise rejected的回调函数集

    function resolve(value) {
        if (value instanceof myPromise) {
            return value.then(resolve, reject);
        }
        setTimeout(function () {
            if (self.status === PENDING) {
                self.status = FULFILLED;
                self.data = value;
                for (let i = 0; i < self.onResolvedCallback.length; i++) {
                    self.onResolvedCallback[i](value);
                }
            }
        }, 0);
    }

    function reject(reason) {
        setTimeout(function () {
            if (self.status === PENDING) {
                self.status = REJECTED;
                self.data = reason;
                for (let i = 0; i < self.onRejectedCallback.length; i++) {
                    self.onRejectedCallback[i](reason);
                }
            }
        }, 0);
    }

    try {
        executor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

myPromise.prototype.then = function (onFulfilled, onRejected) {
    let self = this;
    let promise2;

    // 根据规范，如果then的参数不是function，则需要忽略它
    onFulfilled =
        typeof onFulfilled === "function" ? onFulfilled : function (v) {
            return v;
        };
    onRejected =
        typeof onRejected === "function" ?
        onRejected :
        function (r) {
            throw r;
        };

    if (self.status === FULFILLED) {
        // 如果promise状态确定为fulfilled，调用onFulFilled，但代码执行中可能会抛出，所以将其包裹在try/catch代码块中
        return promise2 = new myPromise(function (resolve, reject) {
            setTimeout(function () {
                try {
                    let x = onFulfilled(self.data);
                    resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e);
                }
            })
        });
    }
    if (self.status === REJECTED) {
        return promise2 = new myPromise(function (resolve, reject) {
            setTimeout(function () {
                try {
                    let x = onRejected(self.data);
                    resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e);
                }
            })
        });
    }
    if (self.status === PENDING) {
        return promise2 = new myPromise(function (resolve, reject) {
            self.onResolvedCallback.push(function (value) {
                try {
                    let x = onFulfilled(self.data);
                    resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e);
                }
            });
            self.onRejectedCallback.push(function (reason) {
                try {
                    let x = onRejected(self.data);
                    resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e);
                }
            });
        });
    }
};


function resolvePromise(promise2, x, resolve, reject) {
    let then;
    let thenCalledOrThrow = false;
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise'))
    }
    if (x instanceof myPromise) {
        if (x.status === PENDING) {
            x.then(function (v) {
                resolvePromise(promise2, v, resolve, reject)
            }, reject)
        } else {
            x.then(resolve, reject)
        }
        return
    }
    if ((x !== null) && (typeof x === 'object' || typeof x === 'function')) {
        try {
            then = x.then;
            if (typeof then === 'function') {
                then.call(x, function (y) {
                    if (thenCalledOrThrow) return; // 已经调用过
                    thenCalledOrThrow = true;
                    return resolvePromise(promise2, y, resolve, reject)
                }, function (r) {
                    if (thenCalledOrThrow) return;
                    thenCalledOrThrow = true;
                    return reject(r);
                })
            } else {
                resolve(x)
            }
        } catch (e) {
            if (thenCalledOrThrow) return;
            thenCalledOrThrow = true;
            return reject(e);
        }
    } else {
        resolve(x)
    }
}

myPromise.deferred = function () {
    var result = {};
    result.promise = new myPromise(function (resolve, reject) {
        result.resolve = resolve;
        result.reject = reject;
    });
    return result;
}

promisesAplusTests(myPromise, function (err) {
    console.log(err)
});

module.exports = myPromise;