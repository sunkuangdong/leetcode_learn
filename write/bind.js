// 手写 bind
Function.prototype.myBind = function (myThis, ...args) {
    // 判断this是否是函数
    if (typeof this !== 'function') {
        throw new Error(`${this} is not a function`)
    }

    // 2. 创建一个返回函数, 参数为 ...args
    const result = function (...resultArgs) {
        // 3. 调用 self
        // self.apply(this, ...args)
        // 4. result 的调用方式可能为 new，固定 result 的 this
        // 如果不是 new 调用 result，self 的 this 指向 myThis
        // 如果是 new 调用 
        const res = this.apply(this instanceof result ? this : myThis, [...args, ...resultArgs])
        return this instanceof result ? (typeof res === "object" ? res : myThis) : res
    }
    // 返回 result 函数
    return result
}
const objs = {
    name: "孙"
}
const fn = function (name) {
    this.name = name
}
// fn this 指向 objs, objs 的 name 将变为 "褚"
const resFn = fn.myBind(objs, "褚")
new resFn()