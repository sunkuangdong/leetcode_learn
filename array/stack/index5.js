// 基本计算器
const calculate = function (s) {
    s = s.replace(/\s/g, '')
    let num = 0
    const stackNum = []
    let preSign = '+'
    for (let i = 0; i < s.length; i++) {
        if (!isNaN(Number(s[i]))) {
            num = num * 10 + Number(s[i])
        }
        if (isNaN(Number(s[i])) || i === s.length - 1) {
            if (preSign === "+") {
                stackNum.push(Number(num))
            } else if (preSign === "-") {
                stackNum.push(-Number(num))
            } else if (preSign === "*") {
                stackNum.push(Math.floor(stackNum.pop() * num))
            } else if (preSign === "/") {
                stackNum.push(Math.floor(stackNum.pop() / num | 0))
            }
            preSign = s[i];
            num = 0
        }
    }
    let add = 0
    while (stackNum.length) {
        add += stackNum.pop()
    }
    return add
};

calculate("42+2")