var promisesAplusTests = require("promises-aplus-tests");
// 1. 定义三个状态
const padding = "padding"
const fulfilled = "fulfilled"
const rejected = "rejected"
// myPromise
function myPromise(callback) {
    let self = this;
    // 2. 
    // status 记录状态
    // value 记录 resolve 函数参数值
    // reason 记录 rejected 函数参数值
    self.status = padding
    self.value = null
    self.reason = null

    // 11. 创建 成功、失败的数组，
    // 存储 then 中为 padding 状态时, then 的resolve、rejected两个函数
    self.fulfilledCallbackArray = []
    self.rejectedCallbackArray = []

    // 3. resolve 函数
    function resolve(value) {
        if (value instanceof myPromise) {
            return value.then(resolve, reject);
        }
        setTimeout(function () {
            if (self.status === padding) {
                self.status === fulfilled
                self.value = value
                // 11. then 中的第一个参数：resolve 执行
                self.fulfilledCallbackArray.forEach(function (itemResolve) {
                    itemResolve(value)
                })
            }
        })
    }
    // 4. rejected 函数
    function reject(err) {
        setTimeout(function () {
            if (self.status === padding) {
                self.status = rejected
                self.reason = err
                // 12. then 中的第二个参数：reject 执行
                self.rejectedCallbackArray.forEach(function (itemReject) {
                    itemReject(err)
                })
            }
        })
    }
    // 5. 成功和失败的调用
    try {
        callback(resolve, reject)
    } catch (err) {
        reject(err)
    }
}

// 6. then
// 接受两个参数
myPromise.prototype.then = function (onFulfilled, onRejected) {
    let self = this
    let promise2;
    // 7. onFulfilled 不是函数 返回一个函数
    onFulfilled =
        typeof onFulfilled === 'function' ? onFulfilled :
        // 8. resolve 接受参数 并返回
        function (value) {
            return value
        }
    // 9. reject 不是函数 返回一个函数
    onRejected =
        typeof onRejected === 'function' ? onRejected :
        // 10. reject 接受参数 并返回
        function (reason) {
            throw reason;
        }
    /*
        如果调用方式是：
            new myPromise(fn).then(res=>{})
            此时 then 是在实例对象刚创建好立即执行了
            执行的时候很有可能 fn 里的异步操作还没结束，内部状态还是 padding
            需要等 fn 里的操作结束之后，再去执行then中的 resolve、reject
        如果调用方式是：
            const obj = new myPromise(fn)
            obj.then(res=>{})
            此时 then 执行的时候 myPromise 内部状态是成功或者失败
    */
    // 10. 根据当前状态判断处理方式
    // 如果当前状态不是padding 
    if (self.status === fulfilled) {
        // 12. 我们的then需要返回 Promise
        // 如果 then 的 resolve、reject 其中一个抛出异常e,则 promise2 必须拒绝执行，并返回拒因 e
        // 所以需要用到 try...catch, catch 捕获异常直接抛出错误
        // 没有异常 继续之前的执行
        return promise2 = new myPromise(function (resolve, reject) {
            // 16. 模拟异步
            setTimeout(function () {
                try {
                    // 15 
                    // realOnFulfilled 有 return 需要跳转到下一个 promise2
                    let x = onFulfilled(self.value)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (err) {
                    reject(err)
                }
            })
        })
    }
    if (self.status === rejected) {
        return promise2 = new myPromise(function (resolve, reject) {
            // 16. 模拟异步
            setTimeout(function () {
                try {
                    // 15
                    let x = onRejected(self.reason)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (err) {
                    reject(err)
                }
            })
        })
    }
    // 11. 
    // 如果当前状态是 padding 
    // myPromise 当中应该有两个数组，存储 realOnFulfilled、realOnRejected
    // 然后在成功或者失败的阶段，遍历调用
    if (self.status === padding) {
        return promise2 = new myPromise(function (resolve, reject) {
            self.fulfilledCallbackArray.push(function () {
                // 12
                try {
                    let x = onFulfilled(self.value)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (err) {
                    reject(err)
                }
            })
            self.rejectedCallbackArray.push(function () {
                // 12
                try {
                    let x = onRejected(self.reason)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (err) {
                    reject(err)
                }
            })
        })
    }
}

// 15
// 第15步很难，可以不写出来
function resolvePromise(promise, x, resolve, reject) {
    let then
    let callFlag = false
    // 如果 promise 与 x 是同一个对象，说明 return 的是自己的 promise
    // 死循环得报错
    if (promise === x) {
        return reject(new TypeError('The promise and the return value are the same'));
    }
    // 如果x本身为myPromise，那就递归继续then
    if (x instanceof myPromise) {
        // 判断当前promise状态
        if (x.status === padding) {
            x.then(function (y) {
                // 直到结束为止
                resolvePromise(promise, y, resolve, reject)
            }, reject)
        } else {
            x.then(resolve, reject)
        }
        return
    }
    // 如果 x 是对象或者函数，需要判断x.then是否存在
    if ((x !== null) && (typeof x === 'function' || typeof x === 'object')) {
        try {
            then = x.then
            if (typeof then === 'function') {
                // then 是一个函数，需要调用，作用域是x
                // 传递两个函数作为 resolve、reject 的回调
                then.call(x, function (y) {
                    // 成功或失败，其中一个调用了一次之后，都不允许再次调用
                    // 担心return函数面返回相同的 then 调用没完
                    if (callFlag) return;
                    callFlag = true
                    return resolvePromise(promise, y, resolve, reject)
                }, function (z) {
                    // 成功或失败，其中一个调用了一次之后，都不允许再次调用
                    // 担心return函数面返回相同的 then 调用没完
                    if (callFlag) return;
                    callFlag = true
                    return reject(z)
                })
            } else {
                resolve(x)
            }
        } catch (error) {
            // 如果已经调用过 try 中 then 的回调，忽略这步
            if (callFlag) return;
            callFlag = true
            reject(error)
        }
    } else {
        // x 不存在then，进入下一个 then 中
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

// var request = require("request");
// var promise1 = new myPromise((resolve) => {
//     request('https://www.baidu.com', function (error, response) {
//         if (!error && response.statusCode == 200) {
//             resolve('request1 success');
//         }
//     });
// });

// var promise1 = new myPromise((resolve) => {
//     request('https://www.baidu.com', function (error, response) { //         if (!error && response.statusCode == 200) {
//             resolve('request1 success');
//         }
//     });
// });

// promise1.then(res => {
//     console.log("res", res);
// });

// var promise2 = new myPromise((resolve, reject) => {
//     request('https://www.baidu.com', function (error, response) {
//         if (!error && response.statusCode == 200) {
//             reject('request2 failed');
//         }
//     });
// });

// promise2.then(function (value) {
//     console.log(value);
// }, function (reason) {
//     console.log(reason);
// });