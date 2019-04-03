require("should");
const {rangeSub, range} = require("../lib");

it('rangeSub()', function () {
    const r1 = range(1,5);
    rangeSub(r1, r1).should.deepEqual([]);
    let result = rangeSub(r1,range(3));
    result.length.should.equal(2);
    result[0].toArray().should.deepEqual([1,2]);
    result[1].toArray().should.deepEqual([3,4,5]);

    result = rangeSub(r1,range(3,3));
    result[0].toArray().should.deepEqual([1,2]);
    result[1].toArray().should.deepEqual([4,5]);

    result = rangeSub(r1,r1);
    result.length.should.equal(0);
});
