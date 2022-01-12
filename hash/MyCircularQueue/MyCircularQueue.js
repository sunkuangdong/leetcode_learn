// 循环队列实现
/**
 * @param {number} k
 */
var MyCircularQueue = function (k) {
    this.k = k // 队列总长度
    this.head = null // 队首
    this.last = null // 队尾
    this.num = 1 // 当前队列长度
    this.myQueue = {
        1: 1,
        next: null
    } // 初始化队列
};

/*
    队列中添加
*/
MyCircularQueue.prototype.enQueue = function (value) {
    if (this.num === 1) {
        this.myQueue.next = value
        // this.last 指向 this.myQueue.next
        this.last = this.myQueue.next
    }
    if (this.num > 1 && this.num <= this.k) {
        // 修改 this.last 由于引用相同，相当于直接修改 this.myQueue 队尾
        this.last.next = value
        this.last = this.last.next
    } else if (this.num > this.k) {
        throw new Error(`队列超出${this.k}范围，不可再增加`)
    }
    this.head = this.myQueue
    this.num += 1
    return this.myQueue
};

/*
    出队
*/
MyCircularQueue.prototype.deQueue = function () {
    this.myQueue = this.head.next
    this.head = this.myQueue
    this.num -= 1
    return this.myQueue
};

/*
    获取队首元素
*/
MyCircularQueue.prototype.Front = function () {
    return this.head || this.myQueue
};

/*
    获取队尾元素
*/
MyCircularQueue.prototype.Rear = function () {
    return this.last || this.myQueue
};

/*
    检查队列是否为空
*/
MyCircularQueue.prototype.isEmpty = function () {
    return !this.myQueue
};

/*
    检查队列是否已满
*/
MyCircularQueue.prototype.isFull = function () {
    return this.num === this.k
};
var obj = new MyCircularQueue(5)
var param_1 = obj.enQueue({
    2: 2
})
var param_3 = obj.enQueue({
    3: 3
})
var param_4 = obj.enQueue({
    4: 4
})
var param_4 = obj.enQueue({
    5: 5
})
// var param_5 = obj.deQueue()
// param_5 = obj.deQueue()
// param_5 = obj.isEmpty()
let head = obj.Front()
let last = obj.Rear()
let isFull = obj.isFull()
console.log(isFull)