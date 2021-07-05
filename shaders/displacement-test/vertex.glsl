varying vec2 vUv;
varying float noise;
varying vec3 fNormal;
uniform sampler2D texture1;
uniform float scale;

uniform float uTime;

void main() {
  vUv = uv;
  fNormal = normal;
  // TODO: 그린 캔버스의 이미지를, texture2D 로 활용하기
  vec4 noiseTex = texture2D(texture1, vUv);
  noise = noiseTex.r;

  // float displacement = 0.75 * uTime * noise;
  // float displacement = 0.75 * cnoise(0.43 * position + uTime);
  // float displacement = pnoise((normal + uTime), vec3(10.0));

  float normalDisplacement = pnoise(position + uTime, vec3(1.0));
  // float normalDisplacement = cnoise(position + uTime);

  vec3 newPosition = position + normal * scale * normalDisplacement;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}

// ------------------------- SIMPLE SHADER -------------------------------
// varying vec3 fNormal;
// void main() {
//   fNormal = normal;
//   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
// }