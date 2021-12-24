/*
    原理
*/
// function a() {}
// console.log(Object.create(a.prototype) == Object.create(a.prototype));


(function () {
    const SymbolPolyfill = function Symbol(description) {
        // 不能使用new
        if (this instanceof SymbolPolyfill) throw new TypeError("Symbol is not a constructor")
        // 如果参数是一个对象，调用该对象的 toString ，作为 Symbol 值
        const descString = description === undefined ? undefined : String(description);
        // 为了让每一个 symbol 独立了，且能够接收 string 隐式调用toString
        const symbol = Object.create({
            toString: function () {
                return "Symbol(" + this.__Description__ + ")"
            }
        })
        Object.defineProperties(symbol, {
            '__Description__': {
                value: descString,
                writable: false,
                enumerable: false,
                configurable: false
            }
        });
        // 返回这个 symbol
        return symbol
    }
    // const names1 = SymbolPolyfill({
    //     a: "111"
    // })
    // const names2 = SymbolPolyfill({
    //     a: "111"
    // })

    const names1 = SymbolPolyfill('111')
    const names2 = SymbolPolyfill('111')
    console.log(String(names1))
    // console.log(names2.toString())
    console.log(names1 === names2)
})()

/*
    我们无法实现：
    1. 使用typeof 判断 symbol
*/