const Voxels = require('./voxels').Voxels;

const WHITE = "rgb(255,255,255)";
const BLACK = "rgb(0, 0, 0)";
const GRAY = "rgb(127,127,127)";
const YELLOW = "rgb(255,255,0)";
const BLUE = "rgb(0,0,255)";
const GREEN = "rgb(0,255,0)";
const RED = "rgb(255,0,0)";

class VoxelsController {
    constructor(voxels, view) {
        this.voxels = voxels;
        this.view = view;

        this.radius = 10;
        this.level = -this.radius + 1;
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

    initTestBtn(id) {
        const btn = document.getElementById(id);
        btn.onclick = (ev => {

            // console.log(this.voxels.voxels);

            // this.view.paintBoxes(-1, 2, 0, GREEN);
            // this.view.paintBoxes(0, 2, 0, GREEN);
            // this.view.paintBoxes(0, 1, 0, GREEN);

            // this.view.paintEdges(-1, 2, 0, WHITE);
            // this.view.paintEdges(0, 2, 0, WHITE);
            // this.view.paintEdges(0, 1, 0, WHITE);
        });
        return this;
    }

    initClearBtn(id) {
        const btn = document.getElementById(id);
        btn.onclick = (ev => {
            this.view.clear();
        });
        return this;
    }

    updateView() {
        this.paintLevel(this.level - 1, YELLOW);
        this.paintLevel(this.level, BLUE);

        this.view.paintMesh(this.voxels.voxels, WHITE);

        // this.voxels.voxels.forEach(v => {
        //     this.view.paintEdges(v[0], v[1], v[2], WHITE);
        // })

    }

    changeRadius(radius) {
        this.radius = radius;
        this.voxels.setVoxelsPerRadius(radius);
        this.view.clear();
        this.updateView();
    }

    changeLevel(level) {
        this.level = level;
        this.view.clearBoxes();
        this.updateView();
    }

    initCanvas(id) {
        const canvas = document.getElementById(id);
        canvas.onclick = this.onClick.bind(this);
        this.width = canvas.width;
        this.height = canvas.height;
        this.context = canvas.getContext('2d');
    }



    paint() {
        // this.paintBackground();
        // this.paintGrid();

        // this.paintVoxels();
    }


    paintVoxels() {
        this.context.fillStyle = YELLOW;
        this.paintLevel(this.level - 1);

        this.context.fillStyle = BLUE;
        this.paintLevel(this.level);
    }

    paintLevel(level, color) {

        var voxels = this.voxels.voxelsForLevel(level - 1);
        this.view.paintBoxes(voxels, color);
        // for (var i = 0; i < voxels.length; i++) {
        //     var voxel = voxels[i];
        //     this.view.paintBoxes(voxel[0], voxel[1], voxel[2], color);
        //     // this.context.fillRect(voxel[0] * this.pixelWidth, voxel[1] * this.pixelWidth, this.pixelWidth, this.pixelWidth);
        // }
    }
}

module.exports = { VoxelsController: VoxelsController };