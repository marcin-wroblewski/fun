const Life = require('./life').Life;

const WHITE = "rgb(255,255,255)";
const BLACK = "rgb(0, 0, 0)";
const GRAY = "rgb(127,127,127)";

class LifeController {
    constructor(life, canvasId) {
        this.life = life;
        this.pixelWidth = 15;
        this.millis = 250;
        this.stopped = true;
        this.initCanvas(canvasId);
    }

    initStartBtn(id) {
        const btn = document.getElementById(id);
        btn.onclick = this.start.bind(this);
        return this;
    }

    initStopBtn(id) {
        const btn = document.getElementById(id);
        btn.onclick = this.stop.bind(this);
        return this;
    }

    initShowCellsBtn(id) {
        const btn = document.getElementById(id);
        btn.onclick = this.showCells.bind(this);
        return this;
    }

    initSlowDownBtn(id) {
        const btn = document.getElementById(id);
        btn.onclick = this.slowDown.bind(this);
        return this;
    }

    initSpeedUpBtn(id) {
        const btn = document.getElementById(id);
        btn.onclick = this.speedUp.bind(this);
        return this;
    }

    slowDown() {
        this.millis += 50;
    }

    speedUp() {
        if (this.millis > 50) {
            this.millis -= 50;
        }
    }


    showCells() {
        console.log('stopped = ', this.stopped);
        console.log('[' + this.life.liveCells.map(cell => `[${cell[0]}, ${cell[1]}]`).join(',') + ']');
    }

    initCanvas(id) {
        const canvas = document.getElementById(id);
        canvas.onclick = this.onClick.bind(this);
        this.width = canvas.width;
        this.height = canvas.height;
        this.context = canvas.getContext('2d');
    }

    init() {
        this.paint();

        _next = () => {
            if (!this.stopped) {
                this.paint();
                this.life.nextGen();
            }

            setTimeout(() => _next(), this.millis);
        }
        _next();
    }

    start() {
        this.stopped = false;
    }

    stop() {
        this.stopped = true;
    }

    paintBackground() {
        this.context.fillStyle = WHITE;
        this.context.fillRect(0, 0, this.width, this.height);
    }

    paintGrid() {
        this.context.strokeStyle = GRAY;
        this.context.lineWidth = 1;
        for (let x = 0; x < this.width; x += this.pixelWidth) {
            this.context.beginPath();
            this.context.moveTo(x, 0);
            this.context.lineTo(x, this.height);
            this.context.stroke();
        }

        for (let y = 0; y < this.height; y += this.pixelWidth) {
            this.context.beginPath();
            this.context.moveTo(0, y);
            this.context.lineTo(this.width, y);
            this.context.stroke();
        }
    }

    onClick(event) {
        const x = event.offsetX;
        const y = event.offsetY;

        const i = Math.floor(x / this.pixelWidth);
        const j = Math.floor(y / this.pixelWidth);

        this.life.toggle([i, j]);
        this.paint();
    }

    withinBoundaries(cell) {
        const x = cell[0] * this.pixelWidth;
        const y = cell[1] * this.pixelWidth;

        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }

    paint() {
        this.paintBackground();
        this.paintGrid();

        this.context.fillStyle = BLACK;
        this.life.liveCells.forEach(cell => {
            if (this.withinBoundaries(cell)) {
                this.context.fillRect(cell[0] * this.pixelWidth, cell[1] * this.pixelWidth, this.pixelWidth, this.pixelWidth);
            }
        });
    }
}

module.exports = { LifeController };