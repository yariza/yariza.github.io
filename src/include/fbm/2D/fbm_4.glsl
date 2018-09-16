#pragma glslify: noise_2D = require(../../noise/2D/noise)

const mat2 m2 = mat2(  0.80,  0.60,
                      -0.60,  0.80 );

float fbm_4( in vec2 x )
{
    float f = 1.9;
    float s = 0.55;
    float a = 0.0;
    float b = 0.5;

    #pragma unroll_loop
    for( int i=0; i<4; i++ )
    {
        float n = noise_2D(x);
        a += b*n;
        b *= s;
        x = f*m2*x;
    }
	return a;
}

#pragma glslify: export(fbm_4)
