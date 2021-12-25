// ES6 元编程
// const yiDeng1 = {
//     [Symbol.toPrimitive]: (
//         (i) => () => ++i
//     )(0)
// }
// if (yiDeng1 == '1' && yiDeng1 == "2" && yiDeng1 == "3") {
//     console.log("京城一灯")
// }

const yiDeng2 = {
    a: 1,
    b: 2
}
// Symbol.iterator 会在对象被for...of时调用
yiDeng2[Symbol.iterator] = function * (hint) {
    const value = Object.values(yiDeng2)
    for (let i = 0; i < value.length; i++) {
        yield value[i];
    }
}
for (let key of yiDeng2) {
    console.log(key)
}