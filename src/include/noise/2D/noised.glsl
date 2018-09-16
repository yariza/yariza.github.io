#pragma glslify: hash1_2D = require(../../hash/hash1_2D)

vec3 noised_2D( in vec2 x )
{
    vec2 p = floor(x);
    vec2 w = fract(x);
    
    vec2 u = w*w*w*(w*(w*6.0-15.0)+10.0);
    vec2 du = 30.0*w*w*(w*(w-2.0)+1.0);
    
    float a = hash1_2D(p+vec2(0,0));
    float b = hash1_2D(p+vec2(1,0));
    float c = hash1_2D(p+vec2(0,1));
    float d = hash1_2D(p+vec2(1,1));

    float k0 = a;
    float k1 = b - a;
    float k2 = c - a;
    float k4 = a - b - c + d;

    return vec3( -1.0+2.0*(k0 + k1*u.x + k2*u.y + k4*u.x*u.y), 
                      2.0* du * vec2( k1 + k4*u.y,
                                      k2 + k4*u.x ) );
}

#pragma glslify: export(noised_2D)
