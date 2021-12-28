const myAssign = function (target, ...sources) {
    if (target === undefined || target === null) {
        throw new Error("target is undefined or null")
    }
    const result = Object(target)
    for (let i = 0; i < sources.length; i++) {
        const source = sources[i]
        if (source !== undefined && source !== null) {
            // 返回一个key组成的数组
            const keyArray = Reflect.ownKeys(Object(source))
            // 遍历这个数组
            for (let j = 0; j < keyArray.length; j++) {
                // 去除掉不可枚举的属性，包括继承 
                // getOwnPropertyDescriptor 返回对象的自有属性
                const keyCount = keyArray[i]
                const desc = Object.getOwnPropertyDescriptor(source, keyCount)
                // 不能为 undefined enumerable为true
                // enumerable为true 定义了对象的属性是否可以在 for...in 循环和 Object.keys() 中被枚举。
                if (desc !== undefined && desc.enumerable) {
                    result[keyCount] = source[keyCount]
                }
            }
        }
    }
    return result
}