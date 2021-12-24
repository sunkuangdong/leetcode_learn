/*
    原理
*/
// function a() {}
// console.log(Object.create(a.prototype) == Object.create(a.prototype));


(function () {
    // 为了使对象的key不相等
    const generateName = (function () {
        let postfix = 0
        return function (descString) {
            postfix++
            return "@@" + descString + "_" + postfix
        }
    })()
    const SymbolPolyfill = function Symbol(description) {
        // 不能使用new
        if (this instanceof SymbolPolyfill) throw new TypeError("Symbol is not a constructor")
        // 如果参数是一个对象，调用该对象的 toString ，作为 Symbol 值
        const descString = description === undefined ? undefined : String(description);
        // 为了让每一个 symbol 独立了，且能够接收 string 隐式调用toString
        const symbol = Object.create({
            toString: function () {
                // return "Symbol(" + this.__Description__ + ")"
                return this.__Name__
            },
            valueOf: function () {
                return this;
            }
        })
        Object.defineProperties(symbol, {
            '__Description__': {
                value: descString,
                writable: false,
                enumerable: false,
                configurable: false
            },
            "__Name__": {
                value: generateName(description),
                writable: false,
                enumerable: false,
                configurable: false
            }
        });
        // 这里是实现 Symbol.for 和 Symbol.keyFor（待研究）
        let forMap = {};
        Object.defineProperties(SymbolPolyfill, {
            'for': {
                value: function (description) {
                    var descString = description === undefined ? undefined : String(description)
                    return forMap[descString] ? forMap[descString] : forMap[descString] = SymbolPolyfill(descString);
                },
                writable: true,
                enumerable: false,
                configurable: true
            },
            'keyFor': {
                value: function (symbol) {
                    for (var key in forMap) {
                        if (forMap[key] === symbol) return key;
                    }
                },
                writable: true,
                enumerable: false,
                configurable: true
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
    // const names1 = SymbolPolyfill('111')
    const names2 = SymbolPolyfill('111')
    console.log(names2.toString())
    // console.log(names1)
    // console.log(names2)
    // console.log(names1 === names2)
    // const obj = {}
    // obj[names1] = "hello"
    // obj[names2] = "hi"
    // console.log(obj)
})()

/*
    我们无法实现：
    1. 使用typeof 判断 symbol
    2. 传一个字符串返回 Symbol(111)，如果返回会发生错误：作为同一个对象的key会被覆盖
    3. 与其他类型运算报错，能够通过改变valueOf实现隐式调用时报错，但是显示调用时就废掉了
    4. Symbol 值可以显式转为字符串。如果返回会发生错误：作为同一个对象的key会被覆盖
    5. Symbol 作为属性名，该属性不会出现在 for...in、for...of 循环中
*/
/*
    其实我们可以不管作为对象key重复问题，来实现上面无法实现的2和4
*/