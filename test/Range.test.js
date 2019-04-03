const {Range} = require("../lib");

const assert = require("assert").strict;
require("should");

// const {it} = require("mocha");
describe("Range",()=>{
    it('当没有传任何参数时，返回 begin=0, length=1 的实例', function () {
        const range = new Range();
        assert.ok(range.begin===0);
        assert.ok(range.length===1);
    });

    it('当只传第一个参数时，length=1', function () {
        const range = new Range(16);
        assert.ok(range.length===1);
    });

    it('当参数是小数的时候，begin和length会取整', function () {
        const range = new Range(-3.14, 3.14);
        assert.ok(Number.isInteger(range.begin));
        assert.ok(Number.isInteger(range.length));
    });

    it('当 length 为负数时, 返回 length=0', function () {
        const range = new Range(0,-1);
        assert.strictEqual(range.length, 0);
    });

    it('当参数不是number时', function () {
        let range1 = new Range("10", "20");
        assert.ok(range1.begin===10);
        assert.ok(range1.length===20);

        range1 = new Range("a", "a");
        assert.strictEqual(range1.begin, 0);
        assert.strictEqual(range1.length, 0);

        range1 = new Range(undefined);
        assert.strictEqual(range1.begin, 0);
        assert.strictEqual(range1.length, 1);

        range1 = new Range(Infinity, -Infinity);
        assert.strictEqual(range1.begin, 0);
        assert.strictEqual(range1.length, 0);
    });

    it('当 min 和 max 不是整数时，会自动取整', function () {
        const range = new Range(0,10);
        range.min = Math.PI;
        range.max = 9.999;
        // assert.strictEqual(range.min, 3);
        // assert.strictEqual(range.max, 10);
        range.min.should.equal(3);
        range.max.should.equal(10);
    });

    it('length=0的Range，设置max为之前的值，length应该还是0 ', function () {
        const range = new Range(0,0);
        range.max = 0;
        range.length.should.equal(0);
    });

    it('length=0的Range，设置min为之前的值，length应该还是0 ', function () {
        const range = new Range(0,0);
        range.min = 0;
        range.length.should.equal(0);
    });

    it('toArray()', function () {
        let range = new Range(1,5);
        range.toArray().should.deepEqual([1,2,3,4,5]);

        range.length = 0;
        range.toArray().should.deepEqual([]);
    });

    it('toRaw()', function () {
        let range = new Range(1,5);
        range.toRaw().should.deepEqual([1,2,3,4,5]);

        range.length = 0;
        range.toRaw().should.equal(1);
    });

    it('length=0的Range，isContains自己是true', function () {
        let range = new Range(1,0);
        range.isContains(range).should.true();
    });

    it('length=0的Range，has自己的begin是true', function () {
        let range = new Range(1,0);
        range.has(1).should.true();
        range.has(0).should.false();
    });

    it('equal()', function () {
        let range1 = new Range(20,10);
        let range2 = range1.clone();
        range1.equal(range2).should.true();
    });

    it('isIntersect ', function () {
        let range1 = new Range(0,0);
        let range2 = new Range(-1, 2);
        range1.isIntersect(range2).should.true();
        range2.isIntersect(range1).should.true();
    });
});