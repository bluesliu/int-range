const Range = require("./IntRange");

/**
 * 多个 Range 相加
 * 例如：
 * range(1,5) + range(3,7) = [range(1,7)]
 * range(1,2) + range(4,6) = [range(1,2), range(4,6)]
 * @param {Range} args
 * @returns {Array.<Range>}
 */
let rangeAdd = (...args)=>{
    const result = [];
    args.sort((a,b)=>{
        return a.min - b.min;
    });
    while (args.length>0){
        const curRange = args.shift().clone();
        const removeIdxs = [];
        for (let i = 0; i<result.length; i++) {
            let range = result[i];
            if(curRange.isIntersect(range)){
                removeIdxs.push(i);
                curRange.min = Math.min(curRange.min, range.min);
                curRange.max = Math.max(curRange.max, range.max);
            }
        }

        for (let i = removeIdxs.length-1; i >= 0 ; i--) {
            let obsolete = result.splice(removeIdxs[i], 1)[0];
            Range.release(obsolete);
        }

        result.push(curRange);
    }
    return result;
};

module.exports = rangeAdd;