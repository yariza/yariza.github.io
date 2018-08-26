import Sketch from '../sketch';
import * as THREE from 'three';
import waveVert from './shaders/wave.vert';
import waveFrag from './shaders/wave.frag';

export default class Waves {

    static getName = () => {
        return 'waves';
    }

    constructor(options) {

        this.renderer = new THREE.WebGLRenderer();

        this.ctx = Sketch.create(Object.assign(options, {
            type: 'webgl',
            element: this.renderer.domElement,
            context: this.renderer.context
        }));

        this.ctx.setup = this.setup.bind(this);
        this.ctx.resize = this.resize.bind(this);
        this.ctx.draw = this.draw.bind(this);
    }

    setup = () => {
        this.camera = new THREE.PerspectiveCamera( 75, this.ctx.width / this.ctx.height, 0.01, 100 );
        this.camera.position.y = 0.5;
        this.camera.position.z = 5;
        this.camera.rotation.x = -15 / 180 * PI;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0.9, 0.9, 0.9);

        let waveGeo = new THREE.PlaneBufferGeometry(10, 10, 100, 100);
        let waveMat = new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: true } );
        let waveMesh = this.waveMesh = new THREE.Mesh(waveGeo, waveMat);
        waveMesh.rotation.x = HALF_PI;
        this.scene.add(this.waveMesh);
        
        this.geometry = new THREE.CubeGeometry( 2, 2, 2 );
        this.material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: true } );
        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.scene.add( this.mesh );
    };

    resize = () => {
        this.camera.aspect = this.ctx.width / this.ctx.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( this.ctx.width, this.ctx.height );
    }

    draw = () => {
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.02;
        this.renderer.render( this.scene, this.camera );
    };
}
