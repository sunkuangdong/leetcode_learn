/**
 * @param {string} s
 * @return {character}
 */
var firstUniqChar = function (s) {
    if (!s.length) {
        return " "
    }
    const hash = {}
    for (let str of s) {
        if (!hash[str]) {
            hash[str] = 1
        } else {
            hash[str] += 1
        }
    }
    for (let key in hash) {
        if (hash[key] === 1) return key
    }
    return " "
};
console.log(firstUniqChar("abaccdeff"))