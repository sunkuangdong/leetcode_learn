const num = [1, 2, 3, 4]
const containsDuplicate = function (nums) {
    const arr = nums.sort((a, b) => a - b)
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === nums[i + 1]) {
            return true
        }
    }
    return false;
}
console.log(containsDuplicate(num));