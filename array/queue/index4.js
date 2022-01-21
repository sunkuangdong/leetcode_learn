var RecentCounter = function () {
    this.requests = []
};

/**
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function (t) {
    this.requests.push(t)
    let num = 0
    for (let i = 0; i < this.requests.length; i++) {
        if (this.requests[i] >= t - 3000 && this.requests[i] <= t) {
            num += 1
        }
    }
    return num
};

/**
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */