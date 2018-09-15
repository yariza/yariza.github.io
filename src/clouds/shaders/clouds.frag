precision highp float;

uniform vec4 _color;
uniform float _time;

varying vec2 uv;

void main() {
    

    gl_FragColor = vec4(uv, 0.0, 1.0);
}
