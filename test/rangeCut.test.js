require("should");
const {rangeCut, range} = require("../lib");

describe("rangeCut()", ()=>{
    it('[0,5] cut [2,3] = [[0,1],[2,3],[4,5]]', function () {
        rangeCut(range(0,5), range(2,3)).should
            .deepEqual([range(0,1),range(2,3),range(4,5)]);
    });

    it('[0,5] cut 3 = [[0,2],3,[4,5]]', function () {
        rangeCut(range(0,5), range(3)).should
            .deepEqual([range(0,2),range(3),range(4,5)]);
    });

    it('[0,5] cut [10,15] cut [3,13] = [[0,2],[3,5],[6,10],[11,13],[14,15]]', function () {
        rangeCut(range(0,5), range(10,15), range(3,13)).should
            .deepEqual([range(0,2),range(3,5),range(6,10),range(11,13),range(14,15)]);
    });
});