const {RangeGroup, Range} = require('int-range');

// let rg1 = new RangeGroup(new Range(1,1));
// rg1.intersect('1,2');
// console.log(rg1.toString());

let rg2 = new RangeGroup('0-5');
rg2.cut(3);
console.log(rg2.toString());