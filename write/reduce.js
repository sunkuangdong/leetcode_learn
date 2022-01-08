// reduce
/*
    使用：
        接受1-2个参数
        第一个参数是回调函数
            回调函数接受两个参数
                第一个参数是reduce第二个参数 || reduce第二个参数不存在则为数组第一位
        第二个参数不确定
        reduce 没有返回值，操作原数组
*/
const array1 = [1, 2, 3, 4];
const reducer = (previousValue, currentValue, index, arr) => {
    return previousValue + currentValue
};
Array.prototype.myReduce = function (fn, prev) {
    const arr = this
    if (typeof arr !== 'object' && !arr.length) {
        throw new Error('myReduce is not a function')
    }
    if (typeof fn !== 'function') {
        throw new TypeError(`${fn} is not a function`);
    }
    // i 从哪儿开始
    let defaultPrev = null
    let i = 0
    if (!prev) {
        defaultPrev = arr[0]
        i = 1
    } else {
        defaultPrev = prev
        i = 0
    }
    // 返回结果
    for (i; i < arr.length; i++) {
        // 调用回调函数，传递参数
        // 第一个参数 prev 第二个参数
        defaultPrev = fn.call(undefined, defaultPrev, arr[i], index = i, arr)
    }
    return defaultPrev
}
console.log(array1.myReduce(reducer, 5))