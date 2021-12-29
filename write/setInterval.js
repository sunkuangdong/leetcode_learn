// 手写 setInterval
const mySetInterval = (fn, time = 200) => {
    let nowInter = Date.now()
    const check = () => {
        if (Date.now() - nowInter >= time) {
            fn()
            nowInter = Date.now()
        }
        window.requestAnimationFrame(check)
    }
    check()
}
mySetInterval(() => {
    console.log("111")
}, 2000)