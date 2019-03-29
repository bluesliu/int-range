# int-range

`int-range` 是用来计算范围的类库。



## Install:

```shell
npm i int-range
```



## Demo:

创建范围：

```javascript
const {Range, range} = require("int-range");

// 方式1
let r1 = new Range(2, 3); // 创建 begin=2，length=3 的范围
r1.toRaw(); // [2,3,4]
let r2 = new Range(0, 1);	// 创建 begin=0，length=1 的范围
r2.toRaw();								// [0]

// 方式2
let r3 = range(2, 4);			// 创建 min=2，max=4 的范围
r3.toRaw(); 							// [2,3,4]
let r4 = range(0, 0);			// 创建 min=0，max=0 的范围
r4.toRaw();								// [0]
```



范围运算：

目前共支持4种运算函数：`rangeAdd`（并集）、`rangeSub`（差集）、`rangeIntersect`（交集）、`rangeCut`（切割）。这些函数接受的参数类型是一个或多个 `Range` 对象，返回的运算结果是 `Array` 。

```javascript
const {range, rangeAdd, rangeSub, rangeIntersect, rangeCut} = require("int-range");

// 并集
let r1 = range(1,3);								// [1,2,3]
let r2 = range(2,4);								// [2,3,4]
let r3 = range(9,10);								// [9,10]
let result = rangeAdd(r1, r2, r3);	// 计算 r1、r2 的并集
result instanceof Array;						// true
result.length;											// 2
result;															// [[1,2,3,4],[9,10]]

// 差集
r1 = range(1,6);										// [1,2,3,4,5,6]
r2 = range(3,4);										// [3,4]
rangeSub(r1, r2);										// [[1,2],[5,6]]

// 交集
r1 = range(1,3);										// [1,2,3]
r2 = range(2,4);										// [2,3,4]
rangeIntersect(r1, r2);							// [[2,3]]

// 切割
// 可以理解为：(r1 - r2) ∪ (r1 ∩ r2) ∪ (r2 - r1)
r1 = range(1,4);										// [1,2,3,4]
r2 = range(3,6);										// [3,4,5,6]
rangeCut(r1, r2);										// [[1,2],[3,4],[5,6]]
```



使用 `RangeGroup` ：

虽然可以使用以上函数方便的进行运算，但是有一个缺点：运算结果是数组类型，无法进行下一次运算。所以，当有连续运算的需求时，应该使用 `RangeGroup` 对象。`RangeGroup` 实现了以上四种运算方法，并且支持链式调用。

```javascript
const {range, RangeGroup} = require("int-range");

let rg = new RangeGroup();					// []
rg.add(range(1,4)).add(range(3,6));	// [[1,2,3,4,5,6]] (使用链式调用)
rg.intersect(range(3,4));						// [[1,2],[5,6]]
rg.sub(range(5,5));									// [[1,2],[5]]
rg.cut(range(1,6));									// [[1,2],[3,4],[5],[6]]
```



## Update:

|  版本 | 更新内容 |
| ------ | --- |
| 1.4.0 | 1、新增 `RangeGroup` 类<br>2、修复方法：`Range.isIntersect(range)`，当 `range` 参数为 `undefine` 时的BUG|
| 1.3.3 | 1、修复 `Range.begin` 赋值异常的 BUG<br>2、优化项目结构，增加单元测试 |
| 1.3.2 | 修复 `rangeSub(range(0))` 结果异常的 BUG |
| 1.3.1 | 优化 `range()` 方法，可以返回 `length=0` 的 `IntRange` 实例<br>例如： `range(2)` 等价于 `new IntRange(2,0)`|
| 1.3.0 | 1、支持 `IntRange.length = 0`<br>2、新增方法：`IntRange.toRaw()`<br>3、优化算法<br>|
| 1.2.0 | 新增方法：`[静态] IntRange.create()`、`[静态] IntRange.release()`、`IntRange.equal()`|
