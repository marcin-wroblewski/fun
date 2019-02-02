const Voxels = require('./voxels/voxels').Voxels;
const VoxelsController = require('./voxels/controller').VoxelsController;

window.onload = function () {
    const voxels = new Voxels();
    const controller = new VoxelsController(voxels, 20, 'voxels')
        .initRadiusInput('radius')
        .initLevelInput('level');
    controller.paint();
}

