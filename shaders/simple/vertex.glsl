varying float displacement;
varying vec3 vNormal;

uniform float uTime;
uniform float uSpeed;

void main() {
  float t = uTime * uSpeed;

  //--------add displacement------------
  float displacement = 0.75 * cnoise(0.43 * position + t);
  vec3 newPos = position + normal * displacement;
  vNormal = normal * displacement;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1);
}