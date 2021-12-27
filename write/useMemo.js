/*
    思路：
        返回一个函数的返回值
        如果没有依赖项：
            和useCallback一样，只不过返回函数的返回值
        如果有依赖项：
            和useCallback一样，只不过返回函数的返回值
*/

(function () {
    let callbackFn
    let callbackDependencies

    function useMemo(callback, dependencies) {
        if (callbackDependencies) {
            const change = dependencies.every(
                (item, index) => item === callbackDependencies[index]
            )
            // 如果依赖项变了 返回函数调用的返回值
            if (!change) {
                callbackFn = callback()
                callbackDependencies = dependencies
            }
        } else {
            // 初次调用 返回函数调用的返回值
            callbackFn = callback()
            callbackDependencies = dependencies
        }
        return callbackFn
    }
})()