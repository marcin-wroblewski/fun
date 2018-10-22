// The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, 
// each of which is in one of two possible states, alive or dead, (or populated and unpopulated, respectively). 
// Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. 
// At each step in time, the following transitions occur:

// Any live cell with fewer than two live neighbors dies, as if by underpopulation.
// Any live cell with two or three live neighbors lives on to the next generation.
// Any live cell with more than three live neighbors dies, as if by overpopulation.
// Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
class Life {
    constructor(liveCells) {
        this.liveCells = liveCells || [];
    }

    nextGen() {
        const toKill = [];
        const toRevive = [];
        for (let i = 0; i <= this.maxX(); i++) {
            for (let j = 0; j <= this.maxY(); j++) {
                const cell = [i, j];
                const neighbors = this.neighbors(cell);

                if (this.isAlive(cell)) {
                    if (neighbors < 2 || neighbors > 3) {
                        toKill.push(cell);
                    }
                } else if (neighbors === 3) {
                    toRevive.push(cell);
                }
            }
        }

        toKill.forEach(cell => this.setDead(cell));
        toRevive.forEach(cell => this.setAlive(cell));
    }

    maxX() {
        return this.liveCells.reduce((prev, curr) => curr[0] > prev ? curr[0] : prev, -1) + 1;
    }

    maxY() {
        return this.liveCells.reduce((prev, curr) => curr[1] > prev ? curr[1] : prev, -1) + 1;
    }

    neighbors(cell) {
        return this.liveCells.filter(c => this.isNeighbor(c, cell)).length;
    }

    isNeighbor(cell1, cell2) {
        return Math.abs(cell1[0] - cell2[0]) + Math.abs(cell1[1] - cell2[1]) === 1
            || (Math.abs(cell1[0] - cell2[0]) === 1 && Math.abs(cell1[1] - cell2[1]) === 1);
    }

    indexOf(cell) {
        return this.liveCells.findIndex(c => c[0] === cell[0] && c[1] === cell[1]);
    }

    isAlive(cell) {
        return this.indexOf(cell) > -1;
    }

    toggle(cell) {
        const index = this.indexOf(cell);
        if (index > -1) {
            this.liveCells.splice(index, 1);
        } else {
            this.liveCells.push(cell);
        }
    }

    setAlive(cell) {
        if (!this.isAlive(cell)) {
            this.liveCells.push(cell);
        }
    }

    setDead(cell) {
        const index = this.indexOf(cell);
        if (index > -1) {
            this.liveCells.splice(index, 1);
        }
    }



}

function sayHello() {
    console.log('heja');
}

module.exports = { sayHello, Life };