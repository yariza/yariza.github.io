#pragma glslify: noise_3D = require(../../noise/3D/noise)

const mat3 m3  = mat3( 0.00,  0.80,  0.60,
                      -0.80,  0.36, -0.48,
                      -0.60, -0.48,  0.64 );

float fbm_4( in vec3 x )
{
    float f = 2.0;
    float s = 0.5;
    float a = 0.0;
    float b = 0.5;

    #pragma unroll_loop
    for( int i=0; i<4; i++ )
    {
        float n = noise_3D(x);
        a += b*n;
        b *= s;
        x = f*m3*x;
    }
	return a;
}

#pragma glslify: export(fbm_4)
