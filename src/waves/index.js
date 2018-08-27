import Sketch from '../sketch';
import * as THREE from 'three';
let OrbitControls = require('three-orbit-controls')(THREE);
import waveVert from './shaders/wave.vert';
import waveFrag from './shaders/wave.frag';

export default class Waves {

    static getName = () => {
        return 'waves';
    }

    constructor(options) {

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
        });

        this.ctx = Sketch.create(Object.assign(options, {
            type: 'webgl',
            element: this.renderer.domElement,
            context: this.renderer.context
        }));

        this.ctx.setup = this.setup.bind(this);
        this.ctx.resize = this.resize.bind(this);
        this.ctx.draw = this.draw.bind(this);
        this.ctx.mousemove = this.mousemove.bind(this);
        this.ctx.update = this.update.bind(this);
    }

    smoothdamp = (current, target, currentVelocity, smoothTime, maxSpeed, deltaTime) => {
        smoothTime = max (0.000, smoothTime);
        let num = 2 / smoothTime;
        let num2 = num * deltaTime;
        let num3 = 1 / (1 + num2 + 0.48 * num2 * num2 + 0.235 * num2 * num2 * num2);
        let num4 = current - target;
        let num5 = target;
        let num6 = maxSpeed * smoothTime;
        num4 = clamp (num4, -num6, num6);
        target = current - num4;
        let num7 = (currentVelocity + num * num4) * deltaTime;
        currentVelocity = (currentVelocity - num * num7) * num3;
        let num8 = target + (num4 + num7) * num3;
        if (num5 - current > 0 === num8 > num5)
        {
            num8 = num5;
            currentVelocity = (num8 - num5) / deltaTime;
        }
        return [num8, currentVelocity];
    }

    setup = () => {
        this.targetAzimuth = this.azimuth = 0.0;
        this.targetElevation = this.elevation = 15 / 180 * PI;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0.99, 0.99, 0.99);

        this.cameraPivot = new THREE.Object3D();
        this.cameraPivot.position.y = -0.3;

        this.camera = new THREE.PerspectiveCamera( 75, this.ctx.width / this.ctx.height, 0.01, 100 );
        this.camera.position.z = 5;
        this.cameraPivot.add(this.camera);
        this.scene.add(this.cameraPivot);

        this.targetElevation = this.elevation = -10 / 180 * PI;
        this.targetAzimuth = this.azimuth = 0;

        let waveGeo = new THREE.PlaneBufferGeometry(10, 10, 100, 100);
        let waveMat = this.waveMat = new THREE.RawShaderMaterial({
            uniforms: {
                time: { value: 0.5 },
                noiseAmp: { value: 0.5 },
                noiseFreq: { value: 0.3 },
                noiseEvo: { value: 0.04 },
            },
            vertexShader: waveVert,
            fragmentShader: waveFrag,
        });
        let waveMesh = this.waveMesh = new THREE.Mesh(waveGeo, waveMat);
        waveMesh.rotation.x = -HALF_PI;
        this.scene.add(this.waveMesh);
    };

    mousemove = () => {
        let relX = min(max(this.ctx.mouse.x / this.ctx.width, 0), 1);
        let relY = 1.0 - min(max(this.ctx.mouse.y / this.ctx.height, 0), 1);
        let azimuth = lerp(-5, 5, relX);
        let elevation = lerp(-7, -12, relY);
        this.targetAzimuth = azimuth / 180 * PI;
        this.targetElevation = elevation / 180 * PI;
    }

    resize = () => {
        this.camera.aspect = this.ctx.width / this.ctx.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( this.ctx.width, this.ctx.height );
    }

    update = () => {
        this.azimuth = lerp(this.azimuth, this.targetAzimuth, 1 * this.ctx.dt / 1000);
        this.elevation = lerp(this.elevation, this.targetElevation, 1 * this.ctx.dt / 1000);
    }

    draw = () => {
        let time = this.ctx.millis / 1000;
        this.waveMat.uniforms.time.value = time;

        this.cameraPivot.rotation.x = this.elevation;
        this.cameraPivot.rotation.y = this.azimuth;


        this.renderer.render( this.scene, this.camera );
    };
}
