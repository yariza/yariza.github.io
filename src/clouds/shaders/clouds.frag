precision highp float;

uniform vec4 _color;
uniform float _time;
uniform vec2 _resolution;

uniform float _noiseFreq;

varying vec2 uv;

// #pragma glslify: fbm_9_2D = require(../../include/fbm/2D/fbm_9_2D)
#pragma glslify: fbm_4_3D = require(../../include/fbm/3D/fbm_4_3D)
#pragma glslify: noise_3D = require(../../include/noise/3D/noise)

mat3 setCamera( vec3 ro, vec3 ta, float cr )
{
	vec3 cw = normalize(ta-ro);
	vec3 cp = vec3(sin(cr), cos(cr),0.0);
	vec3 cu = normalize( cross(cw,cp) );
	vec3 cv = normalize( cross(cu,cw) );
    return mat3( cu, cv, cw );
}

float rayPlaneIntersection( vec3 ro, vec3 rd, vec3 po, vec3 pn)
{
    float denom = dot(pn, rd);
    float t = dot(po - ro, pn) / denom;
    return t;
}

float map(vec3 pos)
{
    float density = clamp(noise_3D(pos * 0.4 + vec3(0.1, 0.04, 0.1) * _time), 0.0, 1.0);
    density -= smoothstep(4.0, 10.0, pos.y);
    density *= smoothstep(0.0, 1.0, pos.y);
    density -= 0.1;
    return clamp(density, 0.0, 1.0);
}

float raymarch(vec3 cameraPos, vec3 rayDir)
{
    float alpha = 0.0;
    vec3 pos = cameraPos;
    float stepSize = 0.5;
    float weight = stepSize;
    for (int i = 0; i < 64; i++)
    {
        alpha += map(pos) * weight;
        if (alpha > 1.0) return 1.0;
        pos += rayDir * stepSize;
        // stepSize *= 1.2;
    }
    return alpha;
}

void main()
{
    float aspectRatio = _resolution.x / _resolution.y;
    vec2 p = (uv - 0.5) * vec2(aspectRatio, 1.0);

    // gl_FragColor = vec4(fract(p * 10.0), 0.0, 1.0);
    // return;
    
    vec3 cameraPos = vec3(0.0, 10.0, -80.0);
    vec3 cameraTarget = vec3(0.0, 0.0, 0.0);

    mat3 cameraMat = setCamera(cameraPos, cameraTarget, 0.0);
    vec3 rayDir = cameraMat * normalize(vec3(p.xy, 1.0));

    vec3 planeNormal = vec3(0.0, 1.0, 0.0);
    vec3 planeCenter = vec3(0.0, 10.0, 0.0);

    float t = rayPlaneIntersection(cameraPos, rayDir, planeCenter, planeNormal);

    vec3 startPos = cameraPos;    
    if (t > 0.0) {
        startPos += rayDir * t;
    }

    float alpha = raymarch(startPos, rayDir);
    gl_FragColor = mix(vec4(0.3, 0.3, 0.5, 1.0), vec4(0.8, 0.8, 0.8, 1.0), alpha);
    return;

    vec2 pix = uv * _resolution;

    gl_FragColor = vec4(fract(pix / 20.0), 0.0, 1.0);
}
