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

vec3 getNormal(vec3 pos) {
    float eps = 0.0001;
    vec3 cc = vec3(pos.x, fractalNoise(pos), pos.z);
    vec3 cx = vec3(pos.x + eps, fractalNoise(pos + vec3(eps, 0.0, 0.0)), pos.z);
    vec3 cz = vec3(pos.x, fractalNoise(pos + vec3(0.0, 0.0, eps)), pos.z + eps);

    vec3 normal = -normalize(cross(cx - cc, cz - cc));
    return normal;
}

void main() {
    vec3 viewPos = viewPosition.xyz;
    float depth = length(viewPos);

    vec3 normal = getNormal(worldPosition.xyz);
    float fresnel = pow(1.0 - clamp(dot(normalize(cameraPosition - worldPosition.xyz), normal), 0.0, 1.0), 0.4);

    vec3 lightDir = normalize(vec3(0.0, 1.0, 1.0));

    float gray = clamp(dot(normal, lightDir) * 0.2 + fresnel * 0.3, 0.0, 1.0);
    vec3 color = vec3(gray, gray, pow(gray, 0.86));

    float fog = max(smoothstep(2.0, 0.3, depth), smoothstep(2.0, 6.0, depth));
    vec3 fogColor = vec3(1.0);
    color = mix(color, fogColor, fog);
    gl_FragColor = vec4(color, 1.0);
}
