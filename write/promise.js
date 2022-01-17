// 1. 定义三个状态
const padding = "padding"
const fulfilled = "fulfilled"
const rejected = "rejected"
// myPromise
Function.prototype.myPromise = function (callback) {
    // 2. 
    // status 记录状态
    // value 记录 resolve 函数参数值
    // reason 记录 rejected 函数参数值
    this.status = padding
    this.value = null
    this.reason = null

    // 11. 创建 成功、失败的数组，
    // 存储 then 中为 padding 状态时, then 的resolve、rejected两个函数
    this.fulfilledCallbackArray = []
    this.rejectedCallbackArray = []

    // 3. resolve 函数
    const resolve = (value) => {
        if (this.status === padding) {
            this.status === fulfilled
            this.value = value
            // 11. then 中的第一个参数：resolve 执行
            this.fulfilledCallbackArray.forEach(itemResolve => {
                itemResolve(this.value)
            })
        }
    }
    // 4. rejected 函数
    const reject = (err) => {
        if (this.status === padding) {
            this.status = rejected
            this.reason = err
            // 12. then 中的第二个参数：reject 执行
            this.rejectedCallbackArray.forEach(itemReject => {
                itemReject(this.reason)
            })
        }
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
myPromise.prototype.then = function (resolve, reject) {
    // 7. resolve 不是函数 返回一个函数
    let realOnFulfilled = resolve
    if (typeof realOnFulfilled !== 'function') {
        // 8. resolve 接受参数 并返回
        realOnFulfilled = (value) => value
    }
    // 9. reject 不是函数 返回一个函数
    let realOnRejected = reject
    if (typeof realOnRejected !== 'function') {
        // 10. reject 接受参数 并返回
        realOnRejected = (err) => {
            throw err
        }
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
    if (this.status === fulfilled) {
        resolve(this.value)
    }
    if (this.status === rejected) {
        reject(this.reason)
    }
    // 如果当前状态是 padding 
    // myPromise 当中应该有两个数组，存储 realOnFulfilled、realOnRejected
    // 然后在成功或者失败的阶段，遍历调用
    if (this.status === padding) {
        this.fulfilledCallbackArray.push(realOnFulfilled)
        this.rejectedCallbackArray.push(realOnRejected)
    }
}