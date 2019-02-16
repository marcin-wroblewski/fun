const THREE = require('three');

class View {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;
        this.camera.rotation.y = Math.PI / 6;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        var sceneDiv = document.getElementById('scene');
        sceneDiv.appendChild(this.renderer.domElement);
    }

    paintEdges(x, y, z, color) {
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

        this.renderer.render(this.scene, this.camera);
        // var geometry = new THREE.BoxGeometry(1, 1, 1);
        // var material = new THREE.MeshBasicMaterial({ color: color });
        // var cube = new THREE.Mesh(geometry, material);
        // cube.position.x = x;
        // cube.position.y = y;
        // cube.position.z = z;
        // this.scene.add(cube);
        // this.renderer.render(this.scene, this.camera);
    }

    paintBoxes(x, y, z, color) {
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({ color: color });
        var cube = new THREE.Mesh(geometry, material);
        cube.position.x = x;
        cube.position.y = y;
        cube.position.z = z;
        this.scene.add(cube);
        this.renderer.render(this.scene, this.camera);
    }

}

module.exports = { View };