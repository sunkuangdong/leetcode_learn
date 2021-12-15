// 删除链表的倒数第 N 个结点
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
const head = {
    val: 1,
    next: {
        val: 2,
        next: {
            val: 3,
            next: null
        }
    }
}
n = 2
const removeNthFromEnd = function (head, n) {
    if (head.next.size === 1 && n > 0) return []
    const arr = []
    while (head) {
        arr.push(head.val)
        head = head.next
    }
    arr.splice(arr.length - n, 1)
    return arr
};
const headArr = removeNthFromEnd(head, n)
console.log(headArr);