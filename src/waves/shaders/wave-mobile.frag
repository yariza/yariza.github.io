precision mediump float;
precision mediump int;

#pragma glslify: snoise = require(./noise3D)

uniform mat4 viewMatrix;
uniform vec3 cameraPosition;

varying vec4 worldPosition;
varying vec4 viewPosition;

uniform float time;
uniform float noiseAmp;
uniform float noiseFreq;
uniform float noiseEvo;

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
    vec3 viewPos = viewPosition.xyz;
    float depth = length(viewPos);

    vec3 lightDir = normalize(vec3(0.0, 1.0, 1.0));
    vec3 color = vec3(0.4, 0.4, 0.45);

    float fog = max(smoothstep(2.0, 0.3, depth), smoothstep(2.0, 6.0, depth));
    vec3 fogColor = vec3(1.0);
    color = mix(color, fogColor, fog);
    gl_FragColor = vec4(color, 1.0);
}
