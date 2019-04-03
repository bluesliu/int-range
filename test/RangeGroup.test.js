require("should");
const {RangeGroup, range} = require("../lib");

describe("RangeCroup",()=>{
    it('add()', function () {
        let rg = new RangeGroup();
        rg.add(range(1,5));
        rg.add(range(6,10));
        rg.ranges.length.should.equal(2);
        rg.ranges[0].equal(range(1,5)).should.equal(true);
        rg.ranges[1].equal(range(6,10)).should.equal(true);
    });

    it('add() 合并情况', function () {
        let rg = new RangeGroup();
        rg.add(range(1,6));
        rg.add(range(4,10));
        rg.ranges.length.should.equal(1);
        rg.ranges[0].equal(range(1,10)).should.equal(true);

        rg = new RangeGroup();
        rg.add(range(1,4));
        rg.add(range(6,10));
        rg.add(range(4,6));
        rg.ranges.length.should.equal(1);
        rg.ranges[0].equal(range(1,10)).should.equal(true);

        rg = new RangeGroup();
        rg.add(range(1,4)).add(range(6,10)).add(range(20,30)).add(range(4,20));
        rg.ranges.length.should.equal(1);
        rg.ranges[0].equal(range(1,30)).should.equal(true);
    });

    it('sub()', function () {
        let rg = new RangeGroup();
        rg.add(range(1,10));
        rg.sub(range(5,5)).ranges.length.should.equal(2);
        rg.ranges[0].toArray().should.deepEqual([1,2,3,4]);
        rg.ranges[1].toArray().should.deepEqual([6,7,8,9,10]);
    });

    it('sub() 减去一个长度为0的range', function () {
        let rg = new RangeGroup();
        rg.add(range(1,10));
        rg.sub(range(5)).ranges.length.should.equal(2);
        rg.ranges[0].toArray().should.deepEqual([1,2,3,4]);
        rg.ranges[1].toArray().should.deepEqual([5,6,7,8,9,10]);
    });

    it('intersect() ', function () {
        let rg = new RangeGroup(range(1,5), range(6,10));
        rg.ranges.length.should.equal(2);

        let raw = rg.toRaw();
        raw.should.deepEqual([[1,2,3,4,5],[6,7,8,9,10]]);

        rg.intersect(range(5,6));
        rg.toRaw().should.deepEqual([[5],[6]]);
    });

    it('cut()', function () {
        let rg = new RangeGroup(range(1,10));
        rg.cut(range(4,7));
        rg.toRaw().should.deepEqual([[1,2,3],[4,5,6,7],[8,9,10]]);

        rg.cut(range(3,4));
        rg.toRaw().should.deepEqual([[1,2],[3],[4],[5,6,7],[8,9,10]]);

        rg.add(range(3,4));
        rg.toRaw().should.deepEqual([[1,2],[3,4],[5,6,7],[8,9,10]]);

        rg = new RangeGroup(range(1,5));
        rg.cut(range(3)).toRaw().should.deepEqual([[1,2],[3,4,5]])
    });

    it('equal() ', function () {
        let rg1 = new RangeGroup(range(1,10));
        let rg2 = new RangeGroup();
        rg1.equal(rg2).should.false();

        rg2.add(range(1,10));
        rg1.equal(rg2).should.true();

        rg1.add(range(20));
        rg2.add(range(20));
        rg1.equal(rg2).should.true();
    });

    it('isIntersect() ', function () {
        let rg1 = new RangeGroup(range(1,5), range(6,10));
        let rg2 = new RangeGroup(range(5,15));
        rg1.isIntersect(rg2).should.true();
        rg1.isIntersect(range(2,3)).should.true();
        rg1.isIntersect(range(3,8)).should.true();
        rg1.isIntersect(range(20,30)).should.false();
        rg1.isIntersect(6).should.true();
        rg1.isIntersect(20).should.false();
    });
});