//点和向量
class Point extends Array {
    constructor(a, b) {
        super();
        if (typeof a === 'number' && typeof b === 'number') {
            // 输入一个点
            this[0] = a;
            this[1] = b;
        } else if (isPoint(a) && b === undefined) {
            // 输入一个点
            this[0] = a[0];
            this[1] = a[1];
        } else if (isPoint(a) && isPoint(b)) {
            // 输入是两个点，当作向量处理
            this[0] = b[0] - a[0];
            this[1] = b[1] - a[1];
        }
    }

    // 加法，如果输入数组，那么逐个相加
    add(label = 1, a) {
        const sum = new Point(0, 0),
            sign = (a === undefined) ? 1 : label,
            arr = (a === undefined) ? label : a;

        if (typeof arr === 'number') {
            sum[0] = this[0] + arr * sign;
            sum[1] = this[1] + arr * sign;
        } else if (arr.length) {
            sum[0] = this[0] + arr[0] * sign;
            sum[1] = this[1] + arr[1] * sign;
        }
        return (sum);
    }
    // 乘法，如果输入数组，那么逐个相乘
    mul(label = 1, a) {
        const sum = new Point(0, 0),
            sign = (a === undefined) ? 1 : label,
            arr = (a === undefined) ? label : a;

        if (typeof arr === 'number') {
            const temp = (sign === -1) ? 1 / arr : arr;
            sum[0] = this[0] * temp;
            sum[1] = this[1] * temp;
        } else if (arr.length) {
            for (let i = 0; i < 2; i++) {
                const muled = (sign === -1) ? 1 / arr[i] : arr[i];
                sum[i] = this[i] * muled;
            }
        }
        return (sum);
    }
    // 向量相乘
    product(a) {
        return (this[0] * a[0] + this[1] * a[1]);
    }
    // 绝对值
    abs() {
        return (new Point(
            Math.abs(this[0]),
            Math.abs(this[1])
        ));
    }
    // 单位化，符号不变，模变为1
    toUnit(x) {
        const a = +this[0], b = +this[1];
        if (!a && !b) {
            return (new Point([0, 0]));
        }

        const scale = 1 / Math.sqrt(a * a + b * b),
            factor = x ? +x : 1;

        return (new Point([a * scale * factor, b * scale * factor]));
    }
    // 是否是整数点
    isInteger() {
        if (this.length !== 2 ||
            this[0] !== Math.floor(this[0]) ||
            this[1] !== Math.floor(this[1])) {
            return (false);
        }
        return (true);
    }
    // 是否平行
    isParallel(vector) {
        return (this[0]*vector[1] === this[1]*vector[0]);
    }
    // 是否垂直
    isVertical(vector) {
        return (!(this[0]*vector[0] + this[1]*vector[1]));
    }
    // 方向相同，0向量输出false
    isSameDire(vector) {
        const vc1 = this.toUnit(),
            vc2 = Point.prototype.toUnit.call(vector);
        return (vc1.isEqual(vc2));
    }
    // 方向相反，0向量输出false
    isOppoDire(vector) {
        const vc1 = this.toUnit().mul(-1),
            vc2 = Point.prototype.toUnit.call(vector);
        return (vc1.isEqual(vc2));
    }
}


function isPoint(a) {
    return (
        a instanceof Point ||
        (a instanceof Object &&
        typeof a[0] === 'number' &&
        typeof a[1] === 'number')
    );
}
function $P(a, b) {
    return (new Point(a, b));
}

export { $P };
