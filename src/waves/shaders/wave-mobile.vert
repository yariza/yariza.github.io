precision highp float;
precision lowp int;

#pragma glslify: snoise = require(./noise3D)

attribute vec3 position;

// = object.matrixWorld
uniform mat4 modelMatrix;
// = camera.matrixWorldInverse * object.matrixWorld
uniform mat4 modelViewMatrix;
// = camera.projectionMatrix
uniform mat4 projectionMatrix;
// = camera.matrixWorldInverse
uniform mat4 viewMatrix;
// = inverse transpose of modelViewMatrix
uniform mat3 normalMatrix;
// = camera position in world space
uniform vec3 cameraPosition;

uniform float time;
uniform float noiseAmp;
uniform float noiseFreq;
uniform float noiseEvo;

varying vec4 viewPosition;

float fractalNoise(vec3 pos) {
    vec3 sample = vec3(pos.x * noiseFreq, pos.z * noiseFreq, time * noiseEvo);

    float amp = noiseAmp;
    float value = 0.0;

    #pragma unroll_loop
    for ( int i = 0; i < 2; i ++ ) {
        amp *= 0.48;
        value += snoise(sample) * amp;
        sample *= 2.0;
    }
    return value;
}

void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);

    float sample = fractalNoise(worldPosition.xyz);
    vec3 offset = vec3(0.0, sample, 0.0);

    vec4 viewPos = viewMatrix * vec4(worldPosition.xyz + offset, 1.0);
    viewPosition = viewPos.xzyw; // axes shuffling to match z depth
    gl_Position = projectionMatrix * viewPos;
}
