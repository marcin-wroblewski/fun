const Life = require('./life').Life;

const WHITE = "rgb(255,255,255)";
const BLACK = "rgb(0, 0, 0)";

class LifeController {
    constructor(canvasId, life) {
        const canvas = document.getElementById(canvasId);
        canvas.onclick = this.onClick.bind(this);
        this.width = canvas.width;
        this.height = canvas.height;
        this.context = canvas.getContext('2d');
        this.life = life;
        this.pixelWidth = 3;
    }

    onClick(event) {
        console.log(event);
        const x = event.offsetX;
        const y = event.offsetY;

        const i = Math.floor(x / this.pixelWidth);
        const j = Math.floor(y / this.pixelWidth);

        this.life.toggle([i, j]);
        console.log(this.life.liveCells.map(cell => `[${cell[0]}, ${cell[1]}]`).join(','));
        this.paint();
    }

    withinBoundaries(cell) {
        const x = cell[0] * this.pixelWidth;
        const y = cell[1] * this.pixelWidth;

        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }

    paint() {
        this.context.fillStyle = WHITE;
        this.context.fillRect(0, 0, this.width, this.height);

        this.context.fillStyle = BLACK;
        this.life.liveCells.forEach(cell => {
            if (this.withinBoundaries(cell)) {
                this.context.fillRect(cell[0] * this.pixelWidth, cell[1] * this.pixelWidth, this.pixelWidth, this.pixelWidth);
            }
        });
    }
}

module.exports = { LifeController };