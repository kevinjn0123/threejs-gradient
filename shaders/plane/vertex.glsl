varying vec3 vNormal;
varying float displacement;
varying vec3 vPos;

uniform float uTime;
uniform float uSpeed;
uniform float uNoiseDensity;
uniform float uNoiseStrength;
uniform float uFrequency;

void main() {
  float t = uTime * uSpeed;

  //--------basic ------------
  // vec3 scale = vec3(1.0, 1.0, 1.0);
  // gl_Position = projectionMatrix * modelViewMatrix * vec4(pos * scale, 1.);

  //--------add displacement------------

  float displacement = 0.75 * cnoise(0.43 * position * uFrequency + t);
  vec3 newPos = position + normal * displacement * uNoiseStrength;
  vNormal = normal * displacement;
  vPos = position;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1);
}