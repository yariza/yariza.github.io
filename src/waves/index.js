import Sketch from '../sketch';
import * as THREE from 'three';
import waveVert from './shaders/wave.vert';
import waveFrag from './shaders/wave.frag';
import waveVertLowQ from './shaders/wave-mobile.vert';
import waveFragLowQ from './shaders/wave-mobile.frag';
import Gibberish from 'gibberish-dsp';

window.Gibberish = Gibberish;

export default class Waves {

    getName = () => {
        return 'waves';
    }

    supportsAudio = () => {
        return true;
    }

    constructor(options) {

        this.renderer = new THREE.WebGLRenderer({
            // antialias: true,
            alpha: true,
        });
        this.renderer.autoClear = true;
        this.renderer.setClearColor(0xffffff, 0);

        this.ctx = Sketch.create(Object.assign(options, {
            type: 'webgl',
            retina: false,
            element: this.renderer.domElement,
            context: this.renderer.context
        }));

        this.ctx.setup = this.setup.bind(this);
        this.ctx.resize = this.resize.bind(this);
        this.ctx.draw = this.draw.bind(this);
        this.ctx.mousemove = this.mousemove.bind(this);
        this.ctx.update = this.update.bind(this);
        
        Gibberish.init();
        Gibberish.onstart = this.audioSetup.bind(this);
    }

    audioSetup = () => {
        this.audioStarted = true;

        let out = new Gibberish.Bus2();
        
        this.gain = new Gibberish.Line(0, 1, 5 * Gibberish.context.sampleRate);
        out.amp = this.gain;

        let noise = new Gibberish.Noise();
        let lowNoise = Gibberish.Binops.Mul(new Gibberish.Biquad({input: noise, cutoff:0.1, Q:4, mode:"LP"}), 50);
        let lowNoise2 = Gibberish.Binops.Mul(new Gibberish.Biquad({ input: noise, cutoff: 0.4, Q: 4, mode:"LP"}), 50);

        this.yControl = new Gibberish.OnePole({
            input: 0.5,
            a0: .00005,
            b1: .99995,
        });

        this.resonance = new Gibberish.OnePole({
            input: 0.3,
            a0: .00005,
            b1: .99995,
        });

        let lowCut = Gibberish.Binops.Map(
            Gibberish.Binops.Pow(
                this.yControl,
                1.2
            ),
            20, 200,
            0, 1
        );

        let amp = Gibberish.Binops.Map(
            Gibberish.Binops.Pow(
                this.yControl,
                0.05
            ),
            40.0, 1.0,
            0, 1
        );

        noise = new Gibberish.SVF({
            input: noise,
            cutoff: Gibberish.Binops.Map(
                Gibberish.Binops.Pow(
                    Gibberish.Binops.Map(
                        lowNoise2,
                        0, 1,
                        -0.5, 0.5
                    ),
                    1.2
                ),
                lowCut,
                Gibberish.Binops.Mul(lowCut, 2.0),
                -1,
                1
            ),
            Q: Gibberish.Binops.Clamp(
                this.resonance,
                0.3,
                4.5
            ),
            mode: 0,
        });

        noise = Gibberish.Binops.Mul(noise,
            Gibberish.Binops.Map(
                lowNoise,
                1.0, 5.0,
                -1.0, 1.0
            ),
            amp
        );

        noise.connect(out);

        out = new Gibberish.Reverb({
            input: out,
            roomSize: 0.96,
            damping: .01,
            wet: 0.50,
            dry: 0.05
        });
        
        out.connect();
    }

    mute = () => {
        // console.log('muting');
        this.gain.retrigger(0, 0.03 * Gibberish.context.sampleRate);
    }

    unmute = () => {
        // console.log('unmuting');
        this.gain.retrigger(1, 0.03 * Gibberish.context.sampleRate);
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

        this.fade = 0.0;

        let uniforms = {
            time: { value: 0.5 },
            noiseAmp: { value: 0.5 },
            noiseFreq: { value: 0.3 },
            noiseEvo: { value: 0.04 },
            hqFade: { value: 0.0 },
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

        if (this.yControl) {
            this.yControl.input = relY;
            // console.log('y', relY);
        }
        if (this.resonance) {
            let speed = sqrt(this.ctx.mouse.dx * this.ctx.mouse.dx +
                             this.ctx.mouse.dy * this.ctx.mouse.dy);
            speed = min(speed, 100);
            speed = map(speed, 0, 100, 0, 1);
            speed = pow(speed, 3.0);
            let q = map(speed, 0, 1, 0.3, 10);
            // console.log('q', q);
            this.resonance.input = q;
        }
    }

    resize = () => {
        this.camera.aspect = this.ctx.width / this.ctx.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( this.ctx.width, this.ctx.height );
    }

    update = () => {
        let dt = this.ctx.dt / 1000;
        if (dt > 0.2) {
            dt = 0.02;
        }
        this.azimuth = lerp(this.azimuth, this.targetAzimuth, 1 * dt);
        this.elevation = lerp(this.elevation, this.targetElevation, 1 * dt);
        if (!this.lowQMode) {
            this.hqFade = min(1.0, this.hqFade + 0.2 * dt);
        }
        this.fade = min(1.0, this.fade + 0.3 * dt)
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
                this.hqFade = 0.0;
            }
        }

        let time = this.ctx.millis / 1000;
        this.waveMesh.material.uniforms.time.value = time;
        if (!this.lowQMode) {
            this.waveMesh.material.uniforms.hqFade.value = this.hqFade;
        }
        this.waveMesh.material.uniforms.fade.value = this.fade * this.fade;

        this.cameraPivot.rotation.x = this.elevation;
        this.cameraPivot.rotation.y = this.azimuth;

        this.renderer.render( this.scene, this.camera );
    };
}
