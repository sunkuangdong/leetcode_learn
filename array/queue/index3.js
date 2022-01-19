// 队列的最大值
var MaxQueue = function () {
    this.myQueue = {}
    this.head = null
    this.rear = null
    this.maxValue = null
};

/**
 * @return {number}
 */
MaxQueue.prototype.max_value = function () {
    return this.maxValue ? this.maxValue : -1
};

/** 
 * @param {number} value
 * @return {void}
 */
MaxQueue.prototype.push_back = function (value) {
    if (!this.myQueue.value) {
        this.myQueue = {
            value,
            next: null
        }
        this.rear = this.myQueue
    } else {
        // 存储值
        this.maxValue = Math.max(this.rear.value, value)
        this.rear.next = {
            value,
            next: null
        }
        this.rear = this.rear.next
    }
    this.head = this.myQueue
};

/**
 * @return {number}
 */
MaxQueue.prototype.pop_front = function () {
    const value = this.head.value ? this.head.value : -1
    this.head = this.myQueue.next
    this.myQueue = !this.head ? {} : this.head
    return value
};

const obj = new MaxQueue()
obj.push_back(1)
obj.push_back(2)
obj.max_value()
let param_1 = obj.pop_front()
console.dir(param_1)

/**
 * Your MaxQueue object will be instantiated and called as such:
 * var obj = new MaxQueue()
 * var param_1 = obj.max_value()
 * obj.push_back(value)
 * var param_3 = obj.pop_front()
 */