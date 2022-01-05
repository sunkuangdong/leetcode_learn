// map
Array.prototype.myMap = function (fn) {
    const arr = this
    if (typeof arr !== "object" && !arr.length) {
        throw new Error("请传递可遍历的数组")
    }
    if (typeof fn !== "function") {
        throw new Error("myMap 只接受函数作为参数")
    }
    // 回调函数的返回值，放在一个数组中
    const result = []
    for (let i = 0; i < arr.length; i++) {
        result.push(fn(arr[i], i))
    }
    return result
}

[1, 2, 3].myMap((item, index) => {
    return item + index * 2
})