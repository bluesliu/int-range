# int-range

创建整数范围（`Range`），实现 `Range` 之间的加法、减法、交集、切割；判断 `Range` 之间是否存在相交（`isIntersect`）、包含（`isContains`）关系。

## Insert:

```$xslt
npm i int-range
```


## Demo:

```javascript
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

```

## Output:

```javascript
range1 : {min:0, max:9, length:10}
range2 : {min:8, max:12, length:5}
range2 to Array : 8,9,10,11,12
range1 contains range2 : false
range1 intersect range2 : true
range1 + range2 : {min:0, max:12, length:13}
range1 + range2 + range3 : {min:0, max:12, length:13},{min:20, max:30, length:11}
range1 - range2 : {min:0, max:7, length:8}
range2 - range1 : {min:10, max:12, length:3}
range1 ∩ range2 : {min:8, max:9, length:2}
range1 cut range2 : {min:0, max:7, length:8},{min:8, max:9, length:2},{min:10, max:12, length:3}
```

## Update:

|  版本 | 内容 |
| ------ | --- |
| 1.3.1 | 优化 `range()` 方法，可以返回 `length=0` 的 `Range` 实例。<br>例如： `range(2)` 等价于 `new Range(2,0)`|
| 1.3.0 | 1、支持 `Range.length = 0`<br>2、新增方法：`Range.toRaw()`<br>3、优化算法<br>|
| 1.2.0 | 新增方法：`[静态] Range.create()`、`[静态] Range.release()`、`Range.equal()`|