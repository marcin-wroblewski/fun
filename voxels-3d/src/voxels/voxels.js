function isPrime(p) {
    for (var i = 2; i < p; i++) {
        if (p % i === 0) {
            return false;
        }
    }
    return p > 1 && Number.isInteger(p);
}
function nearestPrime(val) {
    for (var i = val + 1; ; i++) {
        if (isPrime(i)) {
            return i;
        }
    }
}

class Voxels {
    constructor(voxelsPerRadius) {
        this.voxelsPerRadius = voxelsPerRadius | 10;
        this.voxels = [];
        this.voxelsMap = {};
        this.recalculate();
    }

    voxelsForLevel(level) {
        return this.voxels.filter(voxel => voxel[2] === level);
    }

    voxelIndex(value) {
        return Math.floor(value * this.voxelsPerRadius);
    }

    setVoxelsPerRadius(vpr) {
        this.voxelsPerRadius = vpr;
        this.recalculate();
    }

    addVoxel(i, j, k) {
        // i += this.voxelsPerRadius;
        // j += this.voxelsPerRadius;
        // k += this.voxelsPerRadius;

        var voxel = [i, j, k];
        var key = `${i},${j},${k}`;
        if (!this.voxelsMap[key]) {
            this.voxels.push(voxel);
            this.voxelsMap[key] = voxel;
        }

        // if (this.voxels.findIndex(value => value[0] === i && value[1] === j && value[2] === k) === -1) {
        //     this.voxels.push([i, j, k]);
        // }
    }

    addVoxels(i, j, k) {
        this.addVoxel(i, j, k);
        // this.addVoxel(-i - 1, j, k);
        // this.addVoxel(i, -j - 1, k);
        this.addVoxel(i, j, -k - 1);
        // this.addVoxel(-i - 1, -j - 1, k);
        // this.addVoxel(-i - 1, j, -k - 1);
        // this.addVoxel(i, -j - 1, -k - 1);
        // this.addVoxel(-i - 1, -j - 1, -k - 1);
    }

    recalculate() {
        this.voxels = [];
        this.voxelsMap = {};
        var steps = 500 * nearestPrime(this.voxelsPerRadius);
        var interval = this.voxelsPerRadius / steps;
        for (var x = interval; x < 1; x += interval) {
            for (var y = interval; y < 1; y += interval) {
                var z = Math.sqrt(1 - x * x - y * y);
                if (!Number.isNaN(z)) {
                    var i = this.voxelIndex(x);
                    var j = this.voxelIndex(y);
                    var k = this.voxelIndex(z);

                    this.addVoxels(i, j, k);
                    this.addVoxels(i, k, j);
                    this.addVoxels(k, i, j);
                    this.addVoxels(j, i, k);
                    this.addVoxels(j, k, i);
                    this.addVoxels(k, j, i);
                }
            }
        }
    }
}

module.exports = { Voxels, isPrime, nearestPrime };