const Range = require("./IntRange");

/**
 * range(1,5) - range(3,7) = [range(1,2)]
 * range(1,5) - range(3,7) - range(1,2) = []
 * @param {Range} args
 * @returns {Array.<Range>}
 */
let rangeSub = (...args)=>{
    if(args.length===0){
        return [];
    }
    let rawList = [args.shift().toRaw()];
    args.sort((a,b)=>{
        return a.begin - b.begin;
    });
    while (args.length>0){
        let arg = args.shift().toRaw();
        for (let i = 0; i < rawList.length; i++) {
            const raw = rawList[i];
            if((typeof raw) === 'number' && (typeof arg) === 'number'){
                if(raw === arg){
                    return [];
                }
            }
            else if((typeof raw) === 'number' && arg instanceof Array){
                if(arg.indexOf(raw) !== -1){
                    return [];
                }
            }
            else if(raw instanceof Array && (typeof arg) === 'number'){
                const idx = raw.indexOf(arg);
                if(idx !== -1 && idx !== 0){
                    const rightArr = raw.slice(idx);
                    rawList[i] = raw.slice(0, idx);
                    rawList.splice(i+1, 0, rightArr);
                    break;
                }
            }
            else if(raw instanceof Array && arg instanceof Array){
                // 找相同的最小值
                const r1Min = raw[0];
                const r1Max = raw[raw.length-1];
                const r2Min = arg[0];
                const r2Max = arg[arg.length-1];
                let min = null;
                if (r1Min < r2Min) {
                    if (r1Max >= r2Min) {
                        min = r2Min;
                    }
                } else if (r1Min >= r2Min && r1Min <= r2Max) {
                    min = Math.max(r1Min, r2Min);
                }
                if(min === null){
                    continue;
                }

                const idx = raw.indexOf(min);
                const idx2 = arg.indexOf(min);
                arg = arg.slice(idx2);

                const delLen = Math.min(raw.length-idx, arg.length);
                if(idx+delLen < raw.length && idx !== 0){  //切割情况
                    const rightArr = raw.slice(idx+delLen);
                    rawList[i] = raw.slice(0, idx);
                    rawList.splice(i+1, 0, rightArr);
                    break;
                }
                else{
                    raw.splice(idx, delLen);
                    arg.splice(0, delLen);
                    if(arg.length===0){
                        break;
                    }
                }
            }
        }
    }

    // 剔除空数组
    rawList = rawList.filter((value)=>{
        if( (value instanceof Array) && value.length>0){
            return true;
        }
        else return typeof value === 'number';
    });

    // 解析 raw
    const result = [];
    for (let i = 0; i < rawList.length; i++) {
        const item = rawList[i];
        if(item instanceof Array){
            result.push(Range.create(item[0], item.length));
        }
        else if(typeof item === 'number'){
            result.push(Range.create(item, 0));
        }
    }

    return result;
};

module.exports = rangeSub;