// 手写 flat
Array.prototype.myFlat = function (number = 1) {
    const arr = this
    if (typeof arr === "object" && !arr.length) {
        throw new Error("arr is not Array")
    }
    let result = []
    const flatFn = (flatArr) => {
        if (typeof flatArr === "object" && flatArr !== null) {
            result.push(...flatArr)
        }else {
            result.push(flatArr)
        }
    }
    for (let i = 0; i <= number; i++) {
        flatFn(arr[i])
    }
    return result
}

console.log([1, [2, [3]]].myFlat(1))