precision highp float;
precision mediump int;

#pragma glslify: snoise = require(../../include/noise3D)

uniform mat4 viewMatrix;
uniform vec3 cameraPosition;

varying vec4 worldPosition;
varying vec4 viewPosition;

uniform float time;
uniform float noiseAmp;
uniform float noiseFreq;
uniform float noiseEvo;
uniform float hqFade;
uniform float fade;
uniform vec4 bgColor;

float fractalNoise(vec3 pos) {
    vec3 sample = vec3(pos.x * noiseFreq, pos.z * noiseFreq, time * noiseEvo);

    float amp = noiseAmp;
    float value = 0.0;

    #pragma unroll_loop
    for ( int i = 0; i < 8; i ++ ) {
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
    vec3 viewDir = normalize(worldPosition.xyz - cameraPosition);

    vec3 normal = getNormal(worldPosition.xyz);
    float fresnel = pow(1.0 - clamp(dot(-viewDir, normal), 0.0, 1.0), 0.4);

    vec3 lightDir = normalize(vec3(0.0, 1.0, 1.0));

    float gray = clamp(dot(normal, lightDir) * 0.2 + fresnel * 0.3, 0.0, 1.0);
    float refr = pow(clamp(dot(refract(viewDir, normal, 0.8), vec3(0, -0.0499376, -0.998752)), 0.0, 1.0), 20.0);

    vec3 lightColor = vec3(gray, gray, pow(gray, 0.86));
    vec3 darkColor = mix(vec3(0.13, 0.13, 0.15), vec3(1.4, 1.4, 1.7), refr);
    vec3 color = mix(lightColor, darkColor, bgColor.a);

    vec3 baseColor = mix(vec3(0.4, 0.4, 0.45), vec3(0.2, 0.2, 0.25), bgColor.a);
    color = mix(baseColor, color, hqFade);

    float fog = max(smoothstep(2.0, 0.3, depth), smoothstep(2.0, 6.0, depth));
    vec3 fogColor = bgColor.rgb;
    color = mix(color, fogColor, 1.0 - ((1.0 - fog) * fade));
    gl_FragColor = vec4(color, 1.0);
}
