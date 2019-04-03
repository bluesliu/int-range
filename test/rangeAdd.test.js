require("should");
const {rangeAdd, range} = require("../lib");

describe("rangeAdd",()=>{
    it('存在交集的范围相加，结果是1个Range', function () {
        const r1 = range(1,5);
        const r2 = range(5,10);
        rangeAdd(r1,r2).length.should.equal(1);
        rangeAdd(r1,r2)[0].equal(range(1,10)).should.true();

        const r3 = range(4);
        rangeAdd(r1,r3).length.should.equal(1);
        rangeAdd(r1,r3)[0].equal(range(1,5)).should.true();
    });

    it('不存在交集的范围相加', function () {
        const r1 = range(1,5);
        const r2 = range(10,15);
        const r3 = range(8);
        rangeAdd(r1,r2,r3).length.should.equal(3);
        rangeAdd(r1,r2,r3).should.deepEqual([range(1,5),range(8),range(10,15)])
    });
});