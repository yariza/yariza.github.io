float hash1_1D( float n )
{
    return fract( n*17.0*fract( n*0.3183099 ) );
}

#pragma glslify: export(hash1_1D)
