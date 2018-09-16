#pragma glslify: hash1_1D = require(../../hash/hash1_1D)

float noise_3D( in vec3 x )
{
    vec3 p = floor(x);
    vec3 w = fract(x);
    
    vec3 u = w*w*w*(w*(w*6.0-15.0)+10.0);
    
    float n = p.x + 317.0*p.y + 157.0*p.z;
    
    float a = hash1_1D(n+0.0);
    float b = hash1_1D(n+1.0);
    float c = hash1_1D(n+317.0);
    float d = hash1_1D(n+318.0);
    float e = hash1_1D(n+157.0);
	float f = hash1_1D(n+158.0);
    float g = hash1_1D(n+474.0);
    float h = hash1_1D(n+475.0);

    float k0 =   a;
    float k1 =   b - a;
    float k2 =   c - a;
    float k3 =   e - a;
    float k4 =   a - b - c + d;
    float k5 =   a - c - e + g;
    float k6 =   a - b - e + f;
    float k7 = - a + b + c - d + e - f - g + h;

    return -1.0+2.0*(k0 + k1*u.x + k2*u.y + k3*u.z + k4*u.x*u.y + k5*u.y*u.z + k6*u.z*u.x + k7*u.x*u.y*u.z);
}

#pragma glslify: export(noise_3D)
