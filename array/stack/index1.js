// 逆波兰表达式求值
/*
    思路：
        数组作为栈，将数字压入栈
        遇到运算符之后，弹栈两个数，然后将运算结果压入栈中
        直到这个栈为空，说明运算完毕
*/
var evalRPN = function (tokens) {
    const stack = []
    for (let i = 0; i < tokens.length; i++) {
        if (!isNaN(Number(tokens[i]))) {
            stack.push(Number(tokens[i]))
        } else {
            const a = stack.pop()
            const b = stack.pop()
            if (tokens[i] === "+") {
                stack.push(a + b)
            } else if (tokens[i] === "-") {
                stack.push(b - a)
            } else if (tokens[i] === "*") {
                stack.push(a * b)
            } else if (tokens[i] === "/") {
                stack.push(Math.trunc(b / a))
            }
        }

    }
    return stack.pop()
};