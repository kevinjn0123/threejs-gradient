varying vec3 vNormal;
varying float displacement;

void main() {

  gl_FragColor = vec4(vNormal.z * 0.9, vNormal.z * 0.5, vNormal.z, 1.0);
}