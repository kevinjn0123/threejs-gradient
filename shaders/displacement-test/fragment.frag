// varying float noise;
// varying vec3 fNormal;
// void main(void) { gl_FragColor = vec4(fNormal * noise, 1.); }

// ------------------------- SIMPLE SHADER -------------------------------
varying vec3 fNormal;
void main(void) { gl_FragColor = vec4(fNormal, 1.); }