const {Range, range, rangeAdd, rangeSub, rangeIntersect, rangeCut} = require('int-range');

let range1 = new Range(0,10);
console.log(`range1 : ${range1.toString()}`);

let range2 = range(8,12);
console.log(`range2 : ${range2.toString()}`);
console.log(`range2 to Array : ${range2.toArray()}`);


console.log(`range1 contains range2 : ${range1.isContains(range2)}`);
console.log(`range1 intersect range2 : ${range1.isIntersect(range2)}`);

// add
console.log(`range1 + range2 : ${rangeAdd(range1, range2)}`);
let range3 = range(20,30);
console.log(`range1 + range2 + range3 : ${rangeAdd(range1, range2, range3)}`);

// subtract
console.log(`range1 - range2 : ${rangeSub(range1, range2)}`);
console.log(`range2 - range1 : ${rangeSub(range2, range1)}`);

// intersect
console.log(`range1 ∩ range2 : ${rangeIntersect(range1, range2)}`);

// cut
console.log(`range1 cut range2 : ${rangeCut(range1, range2)}`);
