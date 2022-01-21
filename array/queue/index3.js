var MaxQueue = function () {
    this.queue = []
    this.maxQueue = -1
};

/**
 * @return {number}
 */
MaxQueue.prototype.max_value = function () {
    return this.maxQueue
};

/**
 * @param {number} value
 * @return {void}
 */
MaxQueue.prototype.push_back = function (value) {
    this.queue.push(value)
    if (this.queue.length === 1) {
        this.maxQueue = value
    } else {
        this.maxQueue = Math.max(this.maxQueue, value)
    }
};

/**
 * @return {number}
 */
MaxQueue.prototype.pop_front = function () {
    if (!this.queue.length) return -1
    const popNum = this.queue.shift()
    // Math.max(...this.queue) 这步可能不是O(1)
    this.maxQueue = this.queue.length ? Math.max(...this.queue) : -1
    return popNum
};

/**
 * Your MaxQueue object will be instantiated and called as such:
 * var obj = new MaxQueue()
 * var param_1 = obj.max_value()
 * obj.push_back(value)
 * var param_3 = obj.pop_front()
 */