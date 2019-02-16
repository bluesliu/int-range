const Range = require("./IntRange");
const rangeSub = require("./rangeSub");
const rangeIntersect = require("./rangeIntersect");

/**
 * range(1,5) cut range(3,7) = [range(1,2), range(3,5), range(6,7)]
 * @param {Range} args
 * @returns {Array.<Range>}
 */
let rangeCut = (...args)=>{
    let result = [];
    let laveList = args;
    while (laveList.length>0) {
        let curRange = laveList.shift().clone();
        let jiaoArr = [];   //保存所有交集
        for (let i = 0; i < result.length; i++) {
            let subRange = result[i];
            jiaoArr.push(...rangeIntersect(curRange, subRange));
        }
        let chaArr = rangeSub(curRange, ...jiaoArr);    //求差集

        //替换交集
        let tempResult = [];
        for (let i = 0; i < result.length; i++) {
            let subRange = result[i];
            let isFind = false;
            for (let j = 0; j < jiaoArr.length; j++) {
                let jiaoRange = jiaoArr[j];
                if(subRange.isIntersect(jiaoRange)){
                    isFind = true;
                    jiaoArr.splice(j,1);
                    tempResult.push(...rangeCut2(subRange, jiaoRange));
                    break;
                }
            }
            if(!isFind){
                tempResult.push(subRange);
            }
        }

        //添加差集
        tempResult.push(...chaArr);
        result = tempResult;
    }
    result.sort((a,b)=>{return a.min-b.min});
    return result;
};

let rangeCut2 = (range1, range2)=>{
    let result1 = rangeSub(range1,range2);
    let result2 = rangeSub(range2,range1);
    let result3 = rangeIntersect(range1, range2);
    let arr = [];
    if(result1.length>0){
        arr.push(...result1);
    }
    if(result2.length>0){
        arr.push(...result2);
    }
    if(result3.length>0){
        arr.push(...result3);
    }
    arr.sort((a,b)=>{return a.min-b.min});
    return arr;
};

module.exports = rangeCut;