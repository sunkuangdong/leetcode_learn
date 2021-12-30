// 防抖
/*
    fn: callback
    waitTime: 等待时长
    immediate: 是否立即执行
*/
const debounce = function (fn, waitTime, immediate) {
    let timer = null;
    return function () {
        if (immediate && !timer) {
            fn()
        }
        timer && clearTimeout(timer)
        timer = setTimeout(() => {
            fn()
        }, waitTime)
    }
}