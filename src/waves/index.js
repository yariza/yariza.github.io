import Sketch from '../sketch';
import * as THREE from 'three';
let OrbitControls = require('three-orbit-controls')(THREE);
import waveVert from './shaders/wave.vert';
import waveFrag from './shaders/wave.frag';
import waveVertLowQ from './shaders/wave-mobile.vert';
import waveFragLowQ from './shaders/wave-mobile.frag';

export default class Waves {

    static getName = () => {
        return 'waves';
    }

    constructor(options) {

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        this.renderer.autoClear = true;
        this.renderer.setClearColor(0xffffff, 0);

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
        this.scene.background = new THREE.Color(1.0, 1.0, 1.0);

        this.cameraPivot = new THREE.Object3D();
        this.cameraPivot.position.y = -0.3;

        this.camera = new THREE.PerspectiveCamera( 75, this.ctx.width / this.ctx.height, 0.01, 100 );
        this.camera.position.z = 5;
        this.cameraPivot.add(this.camera);
        this.scene.add(this.cameraPivot);

        this.targetElevation = this.elevation = -10 / 180 * PI;
        this.targetAzimuth = this.azimuth = 0;

        let waveGeo = new THREE.PlaneBufferGeometry(10, 10, 100, 100);

        let uniforms = {
            time: { value: 0.5 },
            noiseAmp: { value: 0.5 },
            noiseFreq: { value: 0.3 },
            noiseEvo: { value: 0.04 },
            fade: { value: 0.0 },
        };

        let lowQMat = this.lowQMat = new THREE.RawShaderMaterial({
            uniforms: uniforms,
            vertexShader: waveVertLowQ,
            fragmentShader: waveFragLowQ,
        })

        let highQMat = this.highQMat = new THREE.RawShaderMaterial({
            uniforms: uniforms,
            vertexShader: waveVert,
            fragmentShader: waveFrag,
        });
        this.lowQMode = true;

        let waveMesh = this.waveMesh = new THREE.Mesh(waveGeo, this.lowQMode ? lowQMat : highQMat);
        waveMesh.material = lowQMat;
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
        if (!this.lowQMode) {
            this.fade = min(1.0, this.fade + 0.2 * this.ctx.dt / 1000);
        }
    }

    draw = () => {
        let now = performance.now();
        let dt = now - (this.now || now);
        this.now = now;
        this.dt = lerp((this.dt || 1000), dt, 0.1);

        let upperThreshold = 100;
        let threshold = 17;
        if (this.lowQMode) {
            if (this.dt < threshold) {
                console.log('switching to high q');
                this.waveMesh.material = this.highQMat;
                this.lowQMode = false;
                this.fade = 0.0;
            }
        }

        let time = this.ctx.millis / 1000;
        this.waveMesh.material.uniforms.time.value = time;
        if (!this.lowQMode) {
            this.waveMesh.material.uniforms.fade.value = this.fade;
        }

        this.cameraPivot.rotation.x = this.elevation;
        this.cameraPivot.rotation.y = this.azimuth;

        this.renderer.render( this.scene, this.camera );
    };
}
