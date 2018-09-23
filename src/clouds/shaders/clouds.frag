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
    float density = clamp(noise_3D(pos * 0.007 + vec3(0.5, 0.2, 0.5) * _time), 0.0, 1.0);
    density -= smoothstep(-200.0, 10.0, pos.y);
    density *= smoothstep(-700.0, -500.0, pos.y);
    density -= 0.1;
    return clamp(density, 0.0, 1.0);
}

float raymarch(vec3 cameraPos, vec3 rayDir, float stepSize, out int steps, out vec3 endPos)
{
    float alpha = 0.0;
    vec3 pos = cameraPos;
    float weight = stepSize;
    steps = 0;
    for (int i = 0; i < 128; i++)
    {
        alpha += map(pos) * weight;
        if (alpha > 1.0) break;
        pos += rayDir * stepSize;
        stepSize *= 1.015;
        steps++;
    }
    endPos = pos;
    return clamp(alpha, 0.0, 1.0);
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
    vec3 planeCenter = vec3(0.0, 9.0, 0.0);

    float t = rayPlaneIntersection(cameraPos, rayDir, planeCenter, planeNormal);

    vec3 startPos = cameraPos;   
    if (t > 0.0) {
        startPos += rayDir * t;
        int steps;
        vec3 endPos;
        float alpha = raymarch(startPos, rayDir, 10.0, steps, endPos);
        float dist = length(endPos - cameraPos);
        gl_FragColor = mix(
            vec4(0.3, 0.3, 0.5, 1.0),
            mix(
                vec4(0.8, 0.8, 0.8, 1.0),
                vec4(0.7, 0.5, 0.5, 1.0),
                clamp(pow(dist / 4000.0, 0.6), 0.0, 1.0)
            ),
            alpha
        );
        // gl_FragColor = mix(vec4(0.0, 0.8, 0.8, 1.0), vec4(1.0, 0.0, 0.0, 1.0), float(steps) / 128.0);
        // gl_FragColor = mix(vec4(0.3, 0.3, 0.5, 1.0), vec4(0.8, 0.8, 0.8, 1.0), alpha);
        return;
    }
    else {
        gl_FragColor = vec4(0.3, 0.3, 0.5, 1.0);
        return;
    }
}
