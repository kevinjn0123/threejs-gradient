varying vec2 vUv;
varying float noise;
varying vec3 fNormal;
void main(void) { gl_FragColor = vec4(fNormal * noise, 1.); }