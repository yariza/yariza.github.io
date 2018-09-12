precision mediump float;
precision lowp int;

#pragma glslify: snoise = require(./noise3D)

uniform highp mat4 viewMatrix;
uniform highp vec3 cameraPosition;

varying vec4 viewPosition;

uniform highp float time;
uniform highp float noiseAmp;
uniform highp float noiseFreq;
uniform highp float noiseEvo;
uniform highp float fade;
uniform vec4 bgColor;

void main() {
    vec3 viewPos = viewPosition.xyz;
    float depth = length(viewPos);

    vec3 color = mix(vec3(0.4, 0.4, 0.45), vec3(0.2, 0.2, 0.25), bgColor.a);

    float fog = max(smoothstep(2.0, 0.3, depth), smoothstep(2.0, 6.0, depth));
    vec3 fogColor = bgColor.rgb;
    color = mix(color, fogColor, 1.0 - ((1.0 - fog) * fade));
    gl_FragColor = vec4(color, 1.0);
}
