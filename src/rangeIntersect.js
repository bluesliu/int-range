const Range = require("./IntRange");

/**
 * range(1,5) ∩ range(3,7) = [range(3,5)]
 * @param {Range} args
 * @returns {Array.<Range>}
 */
let rangeIntersect = (...args)=> {
    if (args.length === 0) {
        return [];
    }
    const r1 = args.shift().clone();
    while (args.length > 0) {
        const r2 = args.shift();
        if (r1.length === 0 && r2.length !== 0) {
            if (r1.begin < r2.min || r1.begin > r2.max) {
                return [];
            }
        } else if (r1.length !== 0 && r2.length === 0) {
            if (r2.begin >= r1.min && r2.begin <= r1.max) {
                r1.begin = r2.begin;
                r1.length = 0;
            } else {
                return [];
            }
        } else if (r1.length === 0 && r2.length === 0) {
            if (r1.begin !== r2.begin) {
                return [];
            }
        } else {
            if (r1.min < r2.min) {
                if (r1.max < r2.min) {
                    return [];
                } else {
                    r1.min = r2.min;
                    r1.max = Math.min(r1.max, r2.max);
                }
            } else if (r1.min >= r2.min && r1.min <= r2.max) {
                r1.min = Math.max(r1.min, r2.min);
                r1.max = Math.min(r1.max, r2.max);
            } else {
                return [];
            }
        }
    }
    return [r1];
};

module.exports = rangeIntersect;