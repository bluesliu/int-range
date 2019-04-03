const Range = require("./IntRange");
const rangeAdd = require("./rangeAdd");
const rangeSub = require("./rangeSub");
const rangeIntersect = require("./rangeIntersect");
const rangeCut = require("./rangeCut");

class RangeGroup {
    /**
     *
     * @type {Array.<Range>}
     */
    #ranges = [];

    /**
     *
     * @param {Range} args
     */
    constructor(...args) {


        for (let i = 0; i < args.length; i++) {
            this.add(args[i]);
        }
    }

    /**
     * 范围相加
     * @param {Range} range
     * @returns {RangeGroup}
     */
    add(range) {
        this.#ranges.push(range);
        //排序
        sort(this.#ranges);
        //合并
        merge(this.#ranges);
        return this;
    }

    /**
     *
     * @param range
     * @returns {RangeGroup}
     */
    sub(range) {
        for (let i = 0; i < this.#ranges.length; i++) {
            const curRange = this.#ranges[i];
            if (curRange.isIntersect(range)) {
                this.#ranges[i] = rangeSub(curRange, range);
            }
        }
        // 展开数组
        for (let i = this.#ranges.length - 1; i >= 0; i--) {
            const arr = this.#ranges[i];
            if (!(arr instanceof Array)) {
                continue;
            }
            this.#ranges.splice(i, 1);
            if (arr.length > 0) {
                this.#ranges.splice(i, 0, ...arr);
            }
        }
        sort(this.#ranges);
        merge(this.#ranges);
        return this;
    }

    /**
     *
     * @param {Range} range
     * @returns {RangeGroup}
     */
    intersect(range) {
        for (let i = 0; i < this.#ranges.length; i++) {
            const curRange = this.#ranges[i];
            if (curRange.isIntersect(range)) {
                this.#ranges[i] = rangeIntersect(curRange, range)[0];
            }
        }
        for (let i = this.#ranges.length-1; i >= 0; i--) {
            if(!this.#ranges[i]){
                this.#ranges.splice(i,1);
            }
        }
        return this;
    }

    /**
     *
     * @param {Range} range
     * @returns {RangeGroup}
     */
    cut(range) {
        for (let i = 0; i < this.#ranges.length; i++) {
            const curRange = this.#ranges[i];
            if (curRange.isIntersect(range)) {
                this.#ranges[i] = rangeCut(curRange, range);
            }
        }
        // 展开数组
        for (let i = this.#ranges.length - 1; i >= 0; i--) {
            const arr = this.#ranges[i];
            if (!(arr instanceof Array)) {
                continue;
            }
            this.#ranges.splice(i, 1);
            if (arr.length > 0) {
                this.#ranges.splice(i, 0, ...arr);
            }
        }
        sort(this.#ranges);
        merge(this.#ranges);
        return this;
    }

    /**
     *
     * @returns {Array}
     */
    toRaw() {
        const raw = [];
        for (let i = 0; i < this.#ranges.length; i++) {
            raw[i] = this.#ranges[i].toRaw();
        }
        return raw;
    }

    /**
     *
     * @param {RangeGroup} rg
     * @returns {boolean}
     */
    equal(rg) {
        if(this.#ranges.length !== rg.ranges.length)
            return false;

        for (let i = 0; i < this.#ranges.length; i++) {
            let r1 = this.#ranges[i];
            let r2 = rg.ranges[i];
            if(!r1.equal(r2)){
                return false;
            }
        }
        return true;
    }

    /**
     *
     * @param {RangeGroup, Range, number} obj
     * @returns {boolean}
     */
    isIntersect(obj) {
        for (let i = 0; i < this.#ranges.length; i++) {
            const range = this.#ranges[i];
            if(obj instanceof RangeGroup){
                for (let j = 0; j < obj.ranges.length; j++) {
                    if(range.isIntersect(obj.ranges[j])){
                        return true;
                    }
                }
            }
            else if(obj instanceof Range){
                if(range.isIntersect(obj)){
                    return true;
                }
            }
            else if(typeof obj === 'number'){
                if(range.has(obj)){
                    return true;
                }
            }
            else{
                return false;
            }
        }
        return false;
    }

    reset() {
        this.#ranges.length = 0;
    }

    get ranges() {
        return this.#ranges.concat();
    }
}

let sort = (ranges)=>{
    ranges.sort((a,b)=>{
        return a.min - b.min;
    });
};

/**
 *
 * @param {[Range]} ranges
 * @param {number} index
 */
let merge = (ranges, index=0)=>{
    if(index+1 >= ranges.length){
        return;
    }
    const range1 = ranges[index];
    const range2 = ranges[index+1];
    if(range1.isIntersect(range2)){
        ranges[index] = rangeAdd(range1, range2)[0];
        ranges.splice(index+1, 1);      // remove range2
        merge(ranges, index);
    }
    else{
        merge(ranges, index+1);
    }
};

module.exports = RangeGroup;