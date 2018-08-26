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
        this.camera = new THREE.PerspectiveCamera( 75, this.ctx.width / this.ctx.height, 1, 10000 );
        this.camera.position.z = 1000;
        this.scene = new THREE.Scene();
        this.geometry = new THREE.CubeGeometry( 200, 200, 200 );
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
