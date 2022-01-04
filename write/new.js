// 实现 new
const myNew = function (fn, ...args) {
    const result = {}
    if (fn.prototype !== null) {
        Object.setPrototypeOf(result, fn.prototype);
    }
    const resultFn = fn.apply(result, args)
    if ((typeof resultFn === 'object' || typeof resultFn === 'function') && resultFn !== null) {
        return resultFn;
    }
    return result;
}
const a = function (name) {
    this.name = name
}

console.log(myNew(a, "孙").__proto__)