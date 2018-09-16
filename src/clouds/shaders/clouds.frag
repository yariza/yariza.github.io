precision highp float;

uniform vec4 _color;
uniform float _time;
uniform vec2 _resolution;

varying vec2 uv;

#pragma glslify: fbm_9 = require(../../include/fbm/2D/fbm_9)

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
    vec3 planeCenter = vec3(0.0, 0.0, 0.0);

    float t = rayPlaneIntersection(cameraPos, rayDir, planeCenter, planeNormal);
    if (t > 0.0) {
        t = clamp(t / 100.0, 0.0, 1.0);
        gl_FragColor = vec4(t, t, t, 1.0);
        return;
    }
    else {
        gl_FragColor = vec4(0.3, 0.3, 0.5, 1.0);
        return;
    }

    return;

    vec2 pix = uv * _resolution;

    gl_FragColor = vec4(fract(pix / 20.0), 0.0, 1.0);
}
