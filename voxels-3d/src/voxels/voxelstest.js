class VoxelsTest {
    constructor() {
        this.voxels = [];
    }

    add(i, j, k) {
        this.voxels.push([i, j, k]);
        return this;
    }
}

module.exports = { VoxelsTest };