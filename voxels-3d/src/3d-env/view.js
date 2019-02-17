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
        this.boxes = [];
        this.modified = false;

        this.animate();
    }


    animate() {
        requestAnimationFrame(this.animate.bind(this));
        if (this.modified) {
            return;
        }
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    clear() {
        this.modified = true;
        this.scene.remove(...this.scene.children);
        this.modified = false;
    }

    clearBoxes() {
        this.modified = true;
        this.scene.remove(...this.boxes);
        this.boxes = [];
        this.modified = false;
    }

    paintEdges(x, y, z, color) {
        this.modified = true;
        var material = new THREE.LineBasicMaterial({ color: color });
        var geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(x - 0.5, y - 0.5, z - 0.5));
        geometry.vertices.push(new THREE.Vector3(x + 0.5, y - 0.5, z - 0.5));
        geometry.vertices.push(new THREE.Vector3(x + 0.5, y + 0.5, z - 0.5));
        geometry.vertices.push(new THREE.Vector3(x - 0.5, y + 0.5, z - 0.5));
        geometry.vertices.push(new THREE.Vector3(x - 0.5, y - 0.5, z - 0.5));
        var line = new THREE.Line(geometry, material);

        this.scene.add(line);

        geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(x - 0.5, y - 0.5, z - 0.5));
        geometry.vertices.push(new THREE.Vector3(x - 0.5, y - 0.5, z + 0.5));
        geometry.vertices.push(new THREE.Vector3(x + 0.5, y - 0.5, z + 0.5));
        geometry.vertices.push(new THREE.Vector3(x + 0.5, y - 0.5, z - 0.5));

        line = new THREE.Line(geometry, material);
        this.scene.add(line);

        geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(x - 0.5, y - 0.5, z + 0.5));
        geometry.vertices.push(new THREE.Vector3(x - 0.5, y + 0.5, z + 0.5));
        geometry.vertices.push(new THREE.Vector3(x - 0.5, y + 0.5, z - 0.5));
        line = new THREE.Line(geometry, material);
        this.scene.add(line);

        geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(x - 0.5, y + 0.5, z + 0.5));
        geometry.vertices.push(new THREE.Vector3(x + 0.5, y + 0.5, z + 0.5));
        geometry.vertices.push(new THREE.Vector3(x + 0.5, y + 0.5, z - 0.5));
        line = new THREE.Line(geometry, material);
        this.scene.add(line);

        geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(x + 0.5, y + 0.5, z + 0.5));
        geometry.vertices.push(new THREE.Vector3(x + 0.5, y - 0.5, z + 0.5));
        line = new THREE.Line(geometry, material);
        this.scene.add(line);
        this.modified = false;

    }

    paintBoxes(x, y, z, color) {
        this.modified = true;
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({ color: color });
        var cube = new THREE.Mesh(geometry, material);
        cube.position.x = x;
        cube.position.y = y;
        cube.position.z = z;
        this.boxes.push(cube);
        this.scene.add(cube);
        this.renderer.render(this.scene, this.camera);
        this.modified = false;
    }

}

module.exports = { View };