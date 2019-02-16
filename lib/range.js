const Range = require("./IntRange");

/**
 * 创建一个 Range 的实例
 * @param {number} min
 * @param {number} max
 * @returns {Range}
 */
let range = (min , max=undefined)=>{
    if(max === undefined){
        return Range.create(min, 0);
    }

    if(min>max){
        let t = min;
        min = max;
        max = t;
    }
    return Range.create(min, max-min+1);
};

module.exports = range;