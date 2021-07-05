// varying float noise;
// varying vec3 fNormal;
// void main(void) { gl_FragColor = vec4(fNormal * noise, 1.); }

// ------------------------- SIMPLE SHADER -------------------------------
// varying vec3 fNormal;
// void main(void) { gl_FragColor = vec4(fNormal, 1.); }

// ------------------------- GRADIENT SHADER -------------------------------
varying vec3 fNormal;
varying float displacement;

// uniform vec2 u_resolution;
// uniform float u_time;

vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(6.28318 * (c * t + d));
}

void main() {
  float distort = fNormal.z;

  vec3 brightness = vec3(0.5, 0.5, 0.5);
  vec3 contrast = vec3(0.5, 0.5, 0.5);
  vec3 oscilation = vec3(1.0, 1.0, 1.0);
  vec3 phase = vec3(0.0, 0.1, 0.2);

  // Pass the distortion as input of cospalette
  // vec3 color = cosPalette(distort, brightness, contrast, oscilation,
  // phase);
  vec3 color = vec3(distort, distort, 0.502);

  gl_FragColor = vec4(color, 1.0);
}