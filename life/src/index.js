const life = require('./life/life');
const Life = life.Life;
const LifeController = require('./life/controller').LifeController;

window.onload = function () {
    // const life = new Life([[1, 2], [2, 2], [3, 2]]);200
    const cells = [
        [1, 30], [2, 30], [3, 30], [4, 30], [5, 30], [6, 30], [7, 30], [8, 30],
        [10, 30], [11, 30], [12, 30], [13, 30], [14, 30],
        [18, 30], [19, 30], [20, 30], [27, 30], [28, 30], [29, 30],
        [36, 30], [37, 30], [38, 30], [39, 30], [40, 30], [41, 30],
        [43, 30], [44, 30], [45, 30], [46, 30]
    ].map(cell => [cell[0] + 100, cell[1] + 50]);
    const life = new Life(cells);
    const controller = new LifeController('life', life);

    function next() {
        controller.paint();
        life.nextGen();
        setTimeout(() => {
            next();
        }, (25));
    }

    next();

}

