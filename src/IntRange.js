const $begin = Symbol('begin');
const $length = Symbol('length');
let poolSize = 100;
let objPool = [];

class Range {
    /**
     *
     * @param {number} begin
     * @param {number} length
     */
    constructor(begin = 0, length = 1) {
        this.begin = begin;
        this.length = length;
    }

    /**
     * Range to Array
     * @returns {Array}
     */
    toArray() {
        let arr = [];
        for (let i = 0; i < this.length; i++) {
            arr.push(this.begin+i);
        }
        return arr;
    }

    /**
     *
     * @returns {Array | number}
     */
    toRaw() {
        if(this.length>0){
            return this.toArray();
        }
        return this.begin;
    }

    clone() {
        return new Range(this.begin, this.length);
    }

    get begin() {
        return this[$begin];
    }

    set begin(value) {
        value = Number(value);
        if(isNaN(value) || value===Infinity || value===-Infinity){
            this[$begin] = 0;
        }else{
            this[$begin] = Math.round(value);
        }
    }

    get length() {
        return this[$length];
    }

    set length(value) {
        value = Number(value);
        if(isNaN(value) || value===Infinity || value===-Infinity){
            this[$length] = 0;
        }else{
            this[$length] = Math.max(0, Math.round(value));

        }
    }

    get min() {
        return this.begin;
    }

    set min(value) {
        if(this.min===Math.round(Number(value)))return;
        let _max = this.max;
        this.begin = value;
        this.length = _max - value + 1;
    }

    get max() {
        if(this.length===0){
            return this.begin;
        }
        return this.begin + this.length - 1;
    }

    set max(value) {
        if(this.max===Math.round(Number(value)))return;
        this.length = Math.max(0, value - this.min + 1);
    }

    /**
     * 判断对象是否包含 range
     * @param range
     * @returns {boolean}
     */
    isContains(range) {
        return this.min <= range.min && this.max >= range.max && this.length >= range.length;
    }

    /**
     * 判断对象是否与 range 相交
     * @param range
     * @returns {boolean}
     */
    isIntersect(range) {
        if(!range){
            return false;
        }
        return (this.min >= range.min && this.min <= range.max)
            || (this.max >= range.min && this.max <= range.max)
            || (range.min >= this.min && range.min <= this.max)
            || (range.max >= this.min && range.max <= this.max);
    }

    /**
     *
     * @param value
     * @returns {boolean}
     */
    has(value) {
        return value >= this.min && value <= this.max;
    }

    /**
     *
     * @param range
     * @returns {boolean}
     */
    equal(range) {
        return this.begin===range.begin && this.length===range.length;
    }

    toString() {
        return `{min:${this.min}, max:${this.max}, length:${this.length}}`
    }

    static create(begin=0, length=1) {
        if(objPool.length>0){
            const range = objPool.pop();
            range.begin = begin;
            range.length = length;
            return range;
        }
        return new Range(begin, length);
    }

    static release(range){
        if(range instanceof Range){

            range.begin = 0;
            range.length = 0;

            if(objPool.length+1 <= poolSize){
                objPool.push(range);
            }
        }
    }
}

module.exports = Range;