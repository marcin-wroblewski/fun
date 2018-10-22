const chai = require('chai');
const expect = chai.expect;

const Life = require('../src/life/life').Life;

describe('Life', function () {
    describe('isNeighbor', function () {
        it('should return true when neighbor; false otherwise', function () {
            const life = new Life();
            const cell = [3, 2];

            expect(life.isNeighbor(cell, [2, 3])).to.be.true;
            expect(life.isNeighbor(cell, [3, 3])).to.be.true;
            expect(life.isNeighbor(cell, [4, 3])).to.be.true;
            expect(life.isNeighbor(cell, [2, 2])).to.be.true;
            expect(life.isNeighbor(cell, [3, 1])).to.be.true;
            expect(life.isNeighbor(cell, [4, 2])).to.be.true;
            expect(life.isNeighbor(cell, [2, 1])).to.be.true;
            expect(life.isNeighbor(cell, [4, 1])).to.be.true;

            expect(life.isNeighbor(cell, [10, 10])).to.be.false;
            expect(life.isNeighbor(cell, [3, 2])).to.be.false;
            expect(life.isNeighbor(cell, [0, 0])).to.be.false;
            expect(life.isNeighbor(cell, [3, 0])).to.be.false;
            expect(life.isNeighbor(cell, [1, 2])).to.be.false;
        });
    })

    describe('neighbors', function () {
        it('should return number of neighbor cells', function () {
            const life = new Life([[1, 2], [2, 2], [3, 2]]);

            expect(life.neighbors([2, 1])).to.be.equal(3);
            expect(life.neighbors([1, 1])).to.be.equal(2);
            expect(life.neighbors([1, 2])).to.be.equal(1);
            expect(life.neighbors([0, 0])).to.be.equal(0);

        });
    });

    describe('isAlive', function () {
        it('should tell if cell is alive', function () {
            const life = new Life([[1, 2], [2, 2], [3, 2]]);

            expect(life.isAlive([1, 2])).to.be.true;
            expect(life.isAlive([2, 2])).to.be.true;
            expect(life.isAlive([3, 2])).to.be.true;

            expect(life.isAlive([2, 1])).to.be.false;
            expect(life.isAlive([0, 5])).to.be.false;
        });
    });

    describe('setDead and setAlive', function () {
        it('should set cell dead and alive', function () {
            const life = new Life([[1, 2], [2, 2], [3, 2]]);

            life.setDead([2, 2]);

            life.setAlive([1, 2]);
            life.setAlive([0, 5]);

            expect(life.isAlive([1, 2])).to.be.true;
            expect(life.isAlive([2, 2])).to.be.false;
            expect(life.isAlive([3, 2])).to.be.true;

            expect(life.isAlive([2, 1])).to.be.false;
            expect(life.isAlive([0, 5])).to.be.true;
        });
    });

    describe('maxX, maxY', function () {
        const life = new Life([[1, 2], [2, 2], [3, 2]]);
        life.setAlive([0, 5]);

        expect(life.maxX()).to.be.equal(4);
        expect(life.maxY()).to.be.equal(6);
    });

    describe('nextGen', function () {
        const life = new Life([[1, 2], [2, 2], [3, 2]]);
        life.nextGen();

        expect(life.isAlive([1, 2])).to.be.false;
        expect(life.isAlive([2, 2])).to.be.true;
        expect(life.isAlive([3, 2])).to.be.false;

        expect(life.isAlive([2, 1])).to.be.true;
        expect(life.isAlive([2, 3])).to.be.true;

        expect(life.liveCells.length).to.be.equal(3);
    });

});
