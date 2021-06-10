varying vec3 vNormal;
varying float displacement;

uniform float uC1r;
uniform float uC1g;
uniform float uC1b;
uniform float uC2r;
uniform float uC2g;
uniform float uC2b;

varying vec3 color1;
varying vec3 color2;


//    float map(float value, float min1, float max1, float min2, float max2) {
//   return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
// }


void main() {

vec3 color1 = vec3(uC1r, uC1g, uC1b);
vec3 color2 = vec3(uC2r, uC2g, uC2b);

gl_FragColor = vec4(mix(color1, color2, vNormal.z), 1.0);

  // gl_FragColor = vec4(0.5*(vNormal + vec3(uC1r, uC1g, uC1b)), 1.0);
  //The black is probably the result of all the values becoming less than 0, so no color. If you want it to always have color you could map the values [-1, 1] to [0, 1] before previewing them.

}