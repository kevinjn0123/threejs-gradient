// Include the Ashima code here!

uniform float uTime;
uniform float uSpeed;
varying vec2 vUv;
varying float noise;

float turbulence(vec3 p) {
  float w = 100.0;
  float t = -.5;
  for (float f = 1.0; f <= 10.0; f++) {
    float power = pow(2.0, f);
    t += abs(pnoise(vec3(power * p), vec3(10.0, 10.0, 10.0)) / power);
  }
  return t;
}

void main() {
  float t = uTime * uSpeed;

  vUv = uv;

  noise = 10.0 * -.10 * turbulence(.5 * normal);
  float b = 5.0 * pnoise(0.05 * position + t, vec3(100.0));
  float displacement = -10. * noise + b;

  vec3 newPosition = position + normal * displacement;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}