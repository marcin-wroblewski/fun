const chai = require('chai');
const expect = chai.expect;

const Voxels = require('../src/voxels/voxels').Voxels;
const isPrime = require('../src/voxels/voxels').isPrime;
const nearestPrime = require('../src/voxels/voxels').nearestPrime;

describe('isPrime', function () {
    it('should return true if num is prime', function () {
        expect(isPrime(2)).to.be.true;
        expect(isPrime(3)).to.be.true;
        expect(isPrime(5)).to.be.true;
        expect(isPrime(13)).to.be.true;
        expect(isPrime(29)).to.be.true;
    });

    it('should return false if num is not prime', function () {
        expect(isPrime(1)).to.be.false;
        expect(isPrime(4)).to.be.false;
        expect(isPrime(6)).to.be.false;
        expect(isPrime(20)).to.be.false;
        expect(isPrime(121)).to.be.false;
        expect(isPrime(2.5)).to.be.false;
        expect(isPrime(4.5)).to.be.false;
    });
});

describe('nearestPrime', function () {
    it('should return nearest prime', function () {
        expect(nearestPrime(2)).to.be.equal(3);
        expect(nearestPrime(3)).to.be.equal(5);
        expect(nearestPrime(4)).to.be.equal(5);
        expect(nearestPrime(11)).to.be.equal(13);
        expect(nearestPrime(12)).to.be.equal(13);
        expect(nearestPrime(13)).to.be.equal(17);
        expect(nearestPrime(25)).to.be.equal(29);
    });
});

describe('Voxels', function () {
    describe('voxelIndex', function () {
        it('should return voxel index', function () {
            const voxels = new Voxels(10);
            expect(voxels.voxelIndex(0.0)).to.be.equal(0);
            expect(voxels.voxelIndex(0.09)).to.be.equal(0);
            expect(voxels.voxelIndex(0.11)).to.be.equal(1);
            expect(voxels.voxelIndex(0.9999)).to.be.equal(9);

            console.log(voxels.voxelsForLevel(0));
            console.log(voxels.voxelsForLevel(1));
        });

    });
    // describe('isNeighbor', function () {
    //     it('should return true when neighbor; false otherwise', function () {
    //         const life = new Life();
    //         const cell = [3, 2];

    //         expect(life.isNeighbor(cell, [2, 3])).to.be.true;
    //         expect(life.isNeighbor(cell, [3, 3])).to.be.true;
    //         expect(life.isNeighbor(cell, [4, 3])).to.be.true;
    //         expect(life.isNeighbor(cell, [2, 2])).to.be.true;
    //         expect(life.isNeighbor(cell, [3, 1])).to.be.true;
    //         expect(life.isNeighbor(cell, [4, 2])).to.be.true;
    //         expect(life.isNeighbor(cell, [2, 1])).to.be.true;
    //         expect(life.isNeighbor(cell, [4, 1])).to.be.true;

    //         expect(life.isNeighbor(cell, [10, 10])).to.be.false;
    //         expect(life.isNeighbor(cell, [3, 2])).to.be.false;
    //         expect(life.isNeighbor(cell, [0, 0])).to.be.false;
    //         expect(life.isNeighbor(cell, [3, 0])).to.be.false;
    //         expect(life.isNeighbor(cell, [1, 2])).to.be.false;
    //     });
    // })
});
