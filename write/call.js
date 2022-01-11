Function.prototype.myCall = function (myThis, ...args) {
    // 判断 myThis
    myThis = myThis ? Object(myThis) : window
    // myThis 上有一个方法 为 调用函数，this 指向调用函数
    myThis.fn = this
    // 调用函数，接受函数返回值
    const result = myThis.fn(...args)
    // 删除对象里的fn方法
    delete myThis.fn
    // 返回函数返回值
    return result
}
