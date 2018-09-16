vec2 hash2_1D( float n ) { return fract(sin(vec2(n,n+1.0))*vec2(43758.5453123,22578.1459123)); }

#pragma glslify: export(hash2_1D)
