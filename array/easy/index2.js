// 合并两个有序数组
var merge = function (nums1, m, nums2, n) {
    let p1 = 0,
        p2 = 0
    const arr = []
    while (p1 < m || p2 < n) {
        if (p1 === m) {
            arr.push(nums2[p2++])
        } else if (p2 === n) {
            arr.push(nums1[p1++])
        } else if (nums1[p1] < nums2[p2]) {
            arr.push(nums1[p1++])
        } else {
            arr.push(nums2[p2++])
        }
    }
    for (let i = 0; i < arr.length; i++) {
        nums1[i] = arr[i]
    }
    return nums1
};

console.log(merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3));