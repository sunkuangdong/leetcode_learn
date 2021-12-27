/*
    字符串解码
    给定一个经过编码的字符串，返回它解码后的字符串。
    编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。
    你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。
    此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。

    示例 1：
    输入：s = "3[a]2[bc]"
    输出："aaabcbc"

    思路：
        if !isNaN(chart) num = num * 10 + chart
        chart === "["，num放入栈中，并且处理 number 可能是十倍
        当遇到]符号的时候，将 const times = stackNum pop() str.repeat(times)
        如果都不是，说明遇到的就是字符串，str += chart
*/

var decodeString = function (s) {
    let stackNum = []
    let stackStr = []
    let num = 0
    let str = ''
    for (let chart of s) {
        if (!isNaN(chart)) {
            num = num * 10 + Number(chart)
        } else if (chart === '[') {
            stackNum.push(num)
            num = 0
            stackStr.push(str)
            str = ''
        } else if (chart === ']') {
            const times = stackNum.pop()
            str = stackStr.pop() + str.repeat(times)
        } else {
            str += chart
        }
    }
    return str
};

decodeString("abc3[cd]2[xyz]")