const Voxels = require('./voxels').Voxels;

const WHITE = "rgb(255,255,255)";
const BLACK = "rgb(0, 0, 0)";
const GRAY = "rgb(127,127,127)";
const YELLOW = "rgb(255,255,0,0.5)";
const BLUE = "rgb(0,0,255, 0.5)";
const GREEN = "rgb(0,255,0)";

class VoxelsController {
    constructor(voxels, pixelWidth, canvasId) {
        this.voxels = voxels;
        this.pixelWidth = pixelWidth;
        this.initCanvas(canvasId);

        this.radius = 10;
        this.level = 1;
    }

    initRadiusInput(id) {
        const input = document.getElementById(id);
        input.onchange = (ev => this.changeRadius(parseInt(ev.target.value)));
        return this;
    }

    initLevelInput(id) {
        const input = document.getElementById(id);
        input.onchange = (ev => this.changeLevel(parseInt(ev.target.value)));
        return this;
    }


    changeRadius(radius) {
        this.radius = radius;
        this.voxels.setVoxelsPerRadius(radius);
        this.paint();
    }

    changeLevel(level) {
        this.level = level;
        this.paint();
    }

    initCanvas(id) {
        const canvas = document.getElementById(id);
        canvas.onclick = this.onClick.bind(this);
        this.width = canvas.width;
        this.height = canvas.height;
        this.context = canvas.getContext('2d');
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

    paint() {
        this.paintBackground();
        this.paintGrid();

        this.paintVoxels();
    }


    paintVoxels() {
        this.context.fillStyle = YELLOW;
        this.paintLevel(this.level-1);

        this.context.fillStyle = BLUE;
        this.paintLevel(this.level);
    }

    paintLevel(level) {
        if(level < 1) {
            return;
        }

        var voxels = this.voxels.voxelsForLevel(level - 1);
        for (var i = 0; i < voxels.length; i++) {
            var voxel = voxels[i];
            this.context.fillRect(voxel[0] * this.pixelWidth, voxel[1] * this.pixelWidth, this.pixelWidth, this.pixelWidth);
        }
    }
}

module.exports = { VoxelsController: VoxelsController };