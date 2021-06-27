vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(6.28318 * (c * t + d));
}

void main() {
  gl_FragColor = vec4(1, 0.4, 0.6, 1.0); // a pink color
}