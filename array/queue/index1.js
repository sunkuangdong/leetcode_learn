// 用两个栈实现队列
var CQueue = function () {
    this.deleteQueue = []
    this.appendQueue = []
};

/** 
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function (value) {
    this.appendQueue.push(value)
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function () {
    // [1, 2]
    if (!this.deleteQueue.length) {
        while (this.appendQueue.length) {
            this.deleteQueue.push(this.appendQueue.pop())
        }
    }
    return this.deleteQueue.pop() || -1
};

/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */