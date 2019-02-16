require("should");
const {range,rangeSub} = require("../index");

it('rangeSub()', function () {
    const r1 = range(1,5);
    rangeSub(r1, r1).should.deepEqual([]);
    rangeSub(r1,range(3)).should.deepEqual([range(1,3),range(3,5)]);
    rangeSub(r1,range(3,3)).should.deepEqual([range(1,2),range(4,5)]);
});
