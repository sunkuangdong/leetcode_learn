// 手写 apply
Function.prototype.myApply = function (myThis, arr) {
    // 判断 myThis
    myThis = myThis ? Object(myThis) : window
    // myThis 上的方法为this
    myThis.fn = this
    // 获得函数返回值
    const result = myThis.fn(arr)
    // 调用完删除方法
    delete myThis.fn
    // 返回函数的返回值
    return result
}