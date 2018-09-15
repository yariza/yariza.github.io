import Sketch from '../sketch';
import BaseSketch from '../basesketch';
import { clamp } from '../utils';
import cloudsVert from './shaders/clouds.vert';
import cloudsFrag from './shaders/clouds.frag';

export default class Clouds extends BaseSketch {

    getName = () => {
        return 'clouds';
    }

    supportsAudio = () => {
        return false;
    }

    constructor(options) {
        super();

        this.curDark = this.dark;

        this.ctx = Sketch.create(Object.assign(options, {
            type: 'webgl',
            retina: false,
        }));

        this.ctx.setup = this.setup.bind(this);
        this.ctx.resize = this.resize.bind(this);
        this.ctx.mousemove = this.mousemove.bind(this);
        this.ctx.update = this.update.bind(this);
        this.ctx.draw = this.draw.bind(this);
    }

    setup = () => {
        this.time = 0;

        let gl = this.ctx.context;

        gl.viewport(0, 0, this.ctx.width, this.ctx.height);

        let vs = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vs, cloudsVert);
        gl.compileShader(vs);

        let fs = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fs, cloudsFrag);
        gl.compileShader(fs);
        this.fs = fs;

        let program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        this.program = program;

        if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS))
            console.log(gl.getShaderInfoLog(vs));
        if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS))
            console.log(gl.getShaderInfoLog(fs));
        if (!gl.getProgramParameter(program, gl.LINK_STATUS))
            console.log(gl.getProgramInfoLog(program));

        let vertices = new Float32Array([
            -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, // Triangle 1
            -1.0, 1.0, 1.0, -1.0, -1.0, -1.0 // Triangle 2
        ]);

        let vbuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vbuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        gl.useProgram(program);

        program.uColor = gl.getUniformLocation(program, "_color");
        gl.uniform4fv(program.uColor, [0.0, 0.3, 0.0, 1.0]);

        program.uTime = gl.getUniformLocation(program, "_time");
        gl.uniform1f(program.uTime, 0);

        program.aVertexPosition = gl.getAttribLocation(program, "position");
        gl.enableVertexAttribArray(program.aVertexPosition);
        gl.vertexAttribPointer(program.aVertexPosition, 2, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.TRIANGLES, 0, 2 * 3);
    }

    resize = () => {

    }

    mousemove = () => {

    }

    update = () => {
        let dt = this.ctx.dt / 1000;
        
        this.time += dt;
    }

    draw = () => {
        if (this.stats) {
            this.stats.end();
            this.stats.begin();
        }

        let gl = this.ctx.context;

        gl.uniform1f(this.program.uTime, this.time);
        gl.drawArrays(gl.TRIANGLES, 0, 2 * 3);
    }
}
