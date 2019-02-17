const THREE = require('three');
const installOrbitControls = require('../controls/OrbitControls').installOrbitControls;

console.log('installing o c');
installOrbitControls();

class View {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 10;
        this.camera.position.x = 5;
        this.camera.rotation.y = Math.PI / 6;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        var sceneDiv = document.getElementById('scene');
        this.controls = new THREE.OrbitControls(this.camera, sceneDiv);
        sceneDiv.appendChild(this.renderer.domElement);

        this.boxesGroups = [];

        this.animate();
    }


    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    clear() {
        this.scene.remove(...this.scene.children);
    }

    clearBoxes() {
        this.scene.remove(...this.boxesGroups);
        this.boxesGroups = [];
    }

    paintMesh(voxels, color) {
        var material = new THREE.LineBasicMaterial({ color: color });
        const mesh = new THREE.Group();

        for (var i = 0; i < voxels.length; i++) {
            const x = voxels[i][0];
            const y = voxels[i][1];
            const z = voxels[i][2];

            var geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(x - 0.5, y - 0.5, z - 0.5));
            geometry.vertices.push(new THREE.Vector3(x + 0.5, y - 0.5, z - 0.5));
            geometry.vertices.push(new THREE.Vector3(x + 0.5, y + 0.5, z - 0.5));
            geometry.vertices.push(new THREE.Vector3(x - 0.5, y + 0.5, z - 0.5));
            geometry.vertices.push(new THREE.Vector3(x - 0.5, y - 0.5, z - 0.5));
            var line = new THREE.Line(geometry, material);

            mesh.add(line);

            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(x - 0.5, y - 0.5, z - 0.5));
            geometry.vertices.push(new THREE.Vector3(x - 0.5, y - 0.5, z + 0.5));
            geometry.vertices.push(new THREE.Vector3(x + 0.5, y - 0.5, z + 0.5));
            geometry.vertices.push(new THREE.Vector3(x + 0.5, y - 0.5, z - 0.5));

            line = new THREE.Line(geometry, material);

            mesh.add(line);

            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(x - 0.5, y - 0.5, z + 0.5));
            geometry.vertices.push(new THREE.Vector3(x - 0.5, y + 0.5, z + 0.5));
            geometry.vertices.push(new THREE.Vector3(x - 0.5, y + 0.5, z - 0.5));
            line = new THREE.Line(geometry, material);

            mesh.add(line);

            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(x - 0.5, y + 0.5, z + 0.5));
            geometry.vertices.push(new THREE.Vector3(x + 0.5, y + 0.5, z + 0.5));
            geometry.vertices.push(new THREE.Vector3(x + 0.5, y + 0.5, z - 0.5));
            line = new THREE.Line(geometry, material);

            mesh.add(line);

            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(x + 0.5, y + 0.5, z + 0.5));
            geometry.vertices.push(new THREE.Vector3(x + 0.5, y - 0.5, z + 0.5));
            line = new THREE.Line(geometry, material);

            mesh.add(line);
        }

        this.scene.add(mesh);
    }

    paintEdges(x, y, z, color) {
        const mesh = new THREE.Group();

        this.scene.add(mesh);

    }

    paintBoxes(voxels, color) {
        const boxes = new THREE.Group();
        for (var i = 0; i < voxels.length; i++) {
            const x = voxels[i][0];
            const y = voxels[i][1];
            const z = voxels[i][2];
            var geometry = new THREE.BoxGeometry(1, 1, 1);
            var material = new THREE.MeshBasicMaterial({ color: color });
            var cube = new THREE.Mesh(geometry, material);
            cube.position.x = x;
            cube.position.y = y;
            cube.position.z = z;
            boxes.add(cube);
        }
        this.scene.add(boxes);
        this.boxesGroups.push(boxes);
    }

    // paintBoxes(x, y, z, color) {
    //     var geometry = new THREE.BoxGeometry(1, 1, 1);
    //     var material = new THREE.MeshBasicMaterial({ color: color });
    //     var cube = new THREE.Mesh(geometry, material);
    //     cube.position.x = x;
    //     cube.position.y = y;
    //     cube.position.z = z;
    //     this.boxes.push(cube);
    //     this.scene.add(cube);
    // }

}

module.exports = { View };