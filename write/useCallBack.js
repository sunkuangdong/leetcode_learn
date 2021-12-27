/*
    思路：
        接受两个参数
        如果第二个参数没传：
            每次执行都返回最新的 lastCallbackFn
        如果第二个参数传了：
            将传递的参数存储，函数第二个参数不变时，不调用第一个参数的函数
            第一个函数初次会被调用
*/

(function () {
    let lastCallbackFn
    let lastCallbackDependencies

    function useCallback(callback, dependencies) {
        // 第一次一定会执行 callback
        if (lastCallbackDependencies) {
            // 如果是第二次，判断依赖变了没
            const change = dependencies.every((item, index) => item === lastCallbackDependencies[index])
            // 依赖变了执行一个新的函数
            if (!change) {
                lastCallbackFn = callback
                lastCallbackDependencies = dependencies
            }
        } else {
            // 如果没传，每次给个新的
            lastCallbackFn = callback
            lastCallbackDependencies = dependencies
        }
        return lastCallbackFn
    }
})()