// 手写 instanceof
// 用函数模拟 instanceof
const myInstanceof = function (left, rightType) {
    while (left) {
        if (left.__proto__ === rightType.prototype) {
            return true
        }
        left = left.__proto__
    }
    return !!left && left.__proto__ === rightType.prototype
}

function Car(make) {
    this.make = make;
}
const auto = new Car('Honda');
console.log(myInstanceof(null, Object))
console.log(myInstanceof(auto, Car))