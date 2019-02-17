const Voxels = require('./voxels/voxels').Voxels;
// const Voxels = require('./voxels/voxelstest').VoxelsTest;
const VoxelsController = require('./voxels/controller').VoxelsController;
const View = require('./3d-env/view').View;

window.onload = function () {
    const voxels = new Voxels();
    const view = new View();
    const controller = new VoxelsController(voxels, view)
        .initRadiusInput('radius')
        .initLevelInput('level')
        .initTestBtn('test')
        .initClearBtn('clear');

    controller.updateView();
}

