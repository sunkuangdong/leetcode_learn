// 验证栈序列
/*
    思路：
        ● 用一个栈stack来存储入栈和出栈
        ● index指针记录出栈的那一项
        ● for pushed 入栈 stack.push(pushed[i])
        ● while 当 stack[stack.length - 1] === popped[index] 出栈 stack.pop() index++
        ● 最后如果出完了stack.length === 0，说明完成。
        ● 如果没出完stack.length !== 0，说明出入的顺序不符条件
*/
var validateStackSequences = function (pushed, popped) {
    const stack = []
    let index = 0
    for (let i = 0; i < pushed.length; i++) {
        stack.push(pushed[i])
        while (stack.length && stack[stack.length - 1] === popped[index]) {
            stack.pop()
            index++
        }
    }
    return !stack.length
};
console.log(validateStackSequences([1, 2, 3, 4, 5], [4, 3, 5, 1, 2]))