require("should");
const {range, rangeIntersect} = require("../index");

it('rangeIntersect()', function () {
    rangeIntersect(range(1,5), range(6,10)).should.deepEqual([]);
    rangeIntersect(range(1,5), range(5,10)).should.deepEqual([range(5,5)]);
    rangeIntersect(range(1,5), range(5)).should.deepEqual([range(5)]);
});