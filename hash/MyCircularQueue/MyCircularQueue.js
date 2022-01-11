// 循环队列实现
/**
 * @param {number} k
 */
var MyCircularQueue = function (k) {
    this.k = k // 队列总长度
    this.head = null // 队首
    this.rear = null // 队尾
    this.num = 0 // 当前队列长度
    this.myQueue = {} // 初始化队列
};

/*
    队列中添加
*/
MyCircularQueue.prototype.enQueue = function (value) {
    if (this.num === 0) {
        this.myQueue = {
            value
        }
    }
    if (this.num < this.k) {
        this.rear = {value}
        this.myQueue.next = this.rear
    }
    this.head = this.myQueue
    num += 1
};

/*
    队列中删除
*/
MyCircularQueue.prototype.deQueue = function () {

};

/*
    获取队首元素
*/
MyCircularQueue.prototype.Front = function () {

};

/*
    获取队尾元素
*/
MyCircularQueue.prototype.Rear = function () {

};

/*
    检查队列是否为空
*/
MyCircularQueue.prototype.isEmpty = function () {

};

/*
    检查队列是否已满
*/
MyCircularQueue.prototype.isFull = function () {

};
var obj = new MyCircularQueue(5)
var param_1 = obj.enQueue(1)
var param_2 = obj.enQueue(2)
var param_3 = obj.enQueue(3)
var param_4 = obj.enQueue(4)
console.log(param_4)
/*
 * Your MyCircularQueue object will be instantiated and called as such:
 * var obj = new MyCircularQueue(k)
 * var param_1 = obj.enQueue(value)
 * var param_2 = obj.deQueue()
 * var param_3 = obj.Front()
 * var param_4 = obj.Rear()
 * var param_5 = obj.isEmpty()
 * var param_6 = obj.isFull()
 */