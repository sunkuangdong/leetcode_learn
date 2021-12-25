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
// function * 定义一个生成器函数
// yield：生成器的返回值
yiDeng2[Symbol.iterator] = function* (hint) {
    const value = Object.values(yiDeng2)
    for (let i = 0; i < value.length; i++) {
        yield value[i];
    }
}
for (let key of yiDeng2) {
    console.log(key)
}

let a = 0
let yiDeng3 = async () => {
    a = a + (await 10)
    console.log(a)
}
yiDeng3()
console.log(++a)
// 1 10