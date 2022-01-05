// filter
Array.prototype.myFilter = function (fn) {
    const arr = this
    if (typeof arr !== 'object' && !arr.length) {
        throw new Error("filter is not defined")
    }
    if (typeof fn !== 'function') {
        throw new Error("filter is not a function")
    }

    const result = [];
    for (let i = 0; i < arr.length; i++) {
        // 只返回为true的
        const res = fn(arr[i], i)
        res && result.push(arr[i])
    }
    return result
}

[1, 2, 3].myFilter((item, index) => {
    return item === 1
})