// 节流
const throttle = function (fn, waitTime) {
    let timer = null;
    return function () {
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(this);
                timer = null;
            }, waitTime);
        }
    }
}