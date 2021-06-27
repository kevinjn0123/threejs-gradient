varying vec3 vNormal;
varying float displacement;

uniform float uTime;
uniform float uSpeed;
// uniform float uNoiseStrength;

void main() {
  float t = uTime * uSpeed;

  //--------add displacement------------
  float displacement = 0.75 * pnoise(0.43 * position + t, vec3(10.0));
  vec3 newPos = position + normal * displacement;
  // * uNoiseStrength;
  vNormal = normal * displacement;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1);
}