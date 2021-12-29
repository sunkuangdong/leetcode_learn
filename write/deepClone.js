// 手写深拷贝
const deepClone = function (source) {
    if (typeof source !== 'object' && source === null) {
        return source
    }
    const target = Array.isArray(source) ? [] : {}
    if (source instanceof Object) {
        for (let key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                if (typeof source === 'object' && source !== null) {
                    target[key] = deepClone(source[key])
                } else {
                    target[key] = source[key]
                }
            }
        }
    }
    return target
}