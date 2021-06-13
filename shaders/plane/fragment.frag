varying vec3 vNormal;
varying float displacement;
varying vec3 vPos;

uniform float uC1r;
uniform float uC1g;
uniform float uC1b;
uniform float uC2r;
uniform float uC2g;
uniform float uC2b;
uniform float uC3r;
uniform float uC3g;
uniform float uC3b;

varying vec3 color1;
varying vec3 color2;
varying vec3 color3;




void main() {

vec3 color1 = vec3(uC1r, uC1g, uC1b);
vec3 color2 = vec3(uC2r, uC2g, uC2b);
vec3 color3 = vec3(uC3r, uC3g, uC3b);


  // gl_FragColor = vec4(0.5*(vNormal + vec3(uC1r, uC1g, uC1b)), 1.0);

// gl_FragColor = vec4(mix(color1, color2, vNormal.z), 1.0);

// gl_FragColor = vec4(mix(mix(color1, color3, smoothstep(-3.0, 3.0,vPos.x)), color2, vNormal.z), 1.0);

gl_FragColor = vec4(mix(mix(color1, color3, smoothstep(-3.0, 3.0,vPos.x)), color2, vNormal.z), 1.0);



  //The black is probably the result of all the values becoming less than 0, so no color. If you want it to always have color you could map the values [-1, 1] to [0, 1] before previewing them.

}