import * as THREE from 'three'
import { extend } from '@react-three/fiber'

const points = {
  point_1_x: 0.2,
  point_1_y: 0.2,
  point_2_x: 0.8,
  point_2_y: 0.2,
  point_3_x: 0.2,
  point_3_y: 0.8,
  point_4_x: 0.8,
  point_4_y: 0.8,
}

const getVertices = (points) => [
  {
    x: points.point_1_x,
    y: points.point_1_y,
    color: new THREE.Color('hsl(20, 100%, 50%)'),
  },
  {
    x: points.point_2_x,
    y: points.point_2_y,
    color: new THREE.Color('hsl(0, 100%, 50%)'),
  },
  {
    x: points.point_3_x,
    y: points.point_3_y,
    color: new THREE.Color('hsl(130, 100%, 50%)'),
  },
  {
    x: points.point_4_x,
    y: points.point_4_y,
    color: new THREE.Color('hsl(230, 100%, 50%)'),
  },
]

export class MovingGradientMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uNoiseStrength: { value: 2 },
        texture1: { value: undefined },
        scale: { type: 'f', value: 1.0 },

        vertices: { value: getVertices(points) },
        resolution: { value: new THREE.Vector2(400, 400) },
      },
      vertexShader: `
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }

      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }

      vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }

      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

      vec3 fade(vec3 t) { return t * t * t * (t * (t * 6.0 - 15.0) + 10.0); }

      float cnoise(vec3 P) {
        vec3 Pi0 = floor(P);        // Integer part for indexing
        vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
        Pi0 = mod289(Pi0);
        Pi1 = mod289(Pi1);
        vec3 Pf0 = fract(P);        // Fractional part for interpolation
        vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
        vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
        vec4 iy = vec4(Pi0.yy, Pi1.yy);
        vec4 iz0 = Pi0.zzzz;
        vec4 iz1 = Pi1.zzzz;

        vec4 ixy = permute(permute(ix) + iy);
        vec4 ixy0 = permute(ixy + iz0);
        vec4 ixy1 = permute(ixy + iz1);

        vec4 gx0 = ixy0 * (1.0 / 7.0);
        vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
        gx0 = fract(gx0);
        vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
        vec4 sz0 = step(gz0, vec4(0.0));
        gx0 -= sz0 * (step(0.0, gx0) - 0.5);
        gy0 -= sz0 * (step(0.0, gy0) - 0.5);

        vec4 gx1 = ixy1 * (1.0 / 7.0);
        vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
        gx1 = fract(gx1);
        vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
        vec4 sz1 = step(gz1, vec4(0.0));
        gx1 -= sz1 * (step(0.0, gx1) - 0.5);
        gy1 -= sz1 * (step(0.0, gy1) - 0.5);

        vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);
        vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);
        vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);
        vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);
        vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);
        vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);
        vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);
        vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);

        vec4 norm0 = taylorInvSqrt(
            vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
        g000 *= norm0.x;
        g010 *= norm0.y;
        g100 *= norm0.z;
        g110 *= norm0.w;
        vec4 norm1 = taylorInvSqrt(
            vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
        g001 *= norm1.x;
        g011 *= norm1.y;
        g101 *= norm1.z;
        g111 *= norm1.w;

        float n000 = dot(g000, Pf0);
        float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
        float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
        float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
        float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
        float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
        float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
        float n111 = dot(g111, Pf1);

        vec3 fade_xyz = fade(Pf0);
        vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111),
                      fade_xyz.z);
        vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
        float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
        return 2.2 * n_xyz;
      }

      // Classic Perlin noise, periodic variant
      float pnoise(vec3 P, vec3 rep) {
        vec3 Pi0 = mod(floor(P), rep);        // Integer part, modulo period
        vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period
        Pi0 = mod289(Pi0);
        Pi1 = mod289(Pi1);
        vec3 Pf0 = fract(P);        // Fractional part for interpolation
        vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
        vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
        vec4 iy = vec4(Pi0.yy, Pi1.yy);
        vec4 iz0 = Pi0.zzzz;
        vec4 iz1 = Pi1.zzzz;

        vec4 ixy = permute(permute(ix) + iy);
        vec4 ixy0 = permute(ixy + iz0);
        vec4 ixy1 = permute(ixy + iz1);

        vec4 gx0 = ixy0 * (1.0 / 7.0);
        vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
        gx0 = fract(gx0);
        vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
        vec4 sz0 = step(gz0, vec4(0.0));
        gx0 -= sz0 * (step(0.0, gx0) - 0.5);
        gy0 -= sz0 * (step(0.0, gy0) - 0.5);

        vec4 gx1 = ixy1 * (1.0 / 7.0);
        vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
        gx1 = fract(gx1);
        vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
        vec4 sz1 = step(gz1, vec4(0.0));
        gx1 -= sz1 * (step(0.0, gx1) - 0.5);
        gy1 -= sz1 * (step(0.0, gy1) - 0.5);

        vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);
        vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);
        vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);
        vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);
        vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);
        vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);
        vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);
        vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);

        vec4 norm0 = taylorInvSqrt(
            vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
        g000 *= norm0.x;
        g010 *= norm0.y;
        g100 *= norm0.z;
        g110 *= norm0.w;
        vec4 norm1 = taylorInvSqrt(
            vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
        g001 *= norm1.x;
        g011 *= norm1.y;
        g101 *= norm1.z;
        g111 *= norm1.w;

        float n000 = dot(g000, Pf0);
        float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
        float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
        float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
        float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
        float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
        float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
        float n111 = dot(g111, Pf1);

        vec3 fade_xyz = fade(Pf0);
        vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111),
                      fade_xyz.z);
        vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
        float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
        return 2.2 * n_xyz;
      }
            
            
      
      
      varying vec2 vUv;
      varying float texNoise;
      varying vec3 fNormal;
      uniform sampler2D texture1;
      uniform float scale;
      
      uniform float uTime;
      uniform float uNoiseStrength;
      
      void main() {
        vUv = uv;
        // TODO: 그린 캔버스의 이미지를, texture2D 로 활용하기
        vec4 noiseTex = texture2D(texture1, vUv);
        texNoise = noiseTex.r;
      
        float normalDisplacement =
            pnoise(position + uTime, vec3(0.0)) * uNoiseStrength;
        vec3 newPosition = position + normal * scale * texNoise * normalDisplacement;
      
      
        fNormal = normal * normalDisplacement;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      }
      
      
      `,
      fragmentShader: `struct Vertex {
        float x;
        float y;
        vec3 color;
      };
      uniform Vertex vertices[4];
      varying vec2 vUv;
      varying vec3 fNormal;
      vec3 overlayBlending(vec3 color1, vec3 color2) {
        float r = (color1.r >= 0.5) ? 1.0 - 2.0 * (1.0 - color1.r) * (1.0 - color2.r) : (2.0 * color1.r * color2.r);
        float g = (color1.g >= 0.5) ? 1.0 - 2.0 * (1.0 - color1.g) * (1.0 - color2.g) : (2.0 * color1.g * color2.g);
        float b = (color1.b >= 0.5) ? 1.0 - 2.0 * (1.0 - color1.b) * (1.0 - color2.b) : (2.0 * color1.b * color2.b);
        return vec3(r, g, b);
      }
      vec3 screenBlending(vec3 color1, vec3 color2) {
        float r = 1.0 - (1.0 - color2.r) * (1.0 - color1.r);
        float g = 1.0 - (1.0 - color2.g) * (1.0 - color1.g);
        float b = 1.0 - (1.0 - color2.b) * (1.0 - color1.b);
        return vec3(r, g, b);
      }
      #define PI 3.14159365
      #define TAU 6.28318531
      const vec3 wref =  vec3(1, 1, 1);
      float xyzF(float t){ return mix(pow(t,1./3.), 7.787037*t + 0.139731, step(t,0.00885645)); }
      float xyzR(float t){ return mix(t*t*t , 0.1284185*(t - 0.139731), step(t,0.20689655)); }
      vec3 rgb2lch(in vec3 c) {
        c *= mat3( 0.4124, 0.3576, 0.1805, 0.2126, 0.7152, 0.0722, 0.0193, 0.1192, 0.9505);
        c.x = xyzF(c.x/wref.x);
        c.y = xyzF(c.y/wref.y);
        c.z = xyzF(c.z/wref.z);
        vec3 lab = vec3(max(0.,116.0*c.y - 16.0), 500.0*(c.x - c.y), 200.0*(c.y - c.z));
        return vec3(lab.x, length(vec2(lab.y,lab.z)), atan(lab.z, lab.y));
      }
      vec3 lch2rgb(in vec3 c) {
        c = vec3(c.x, cos(c.z) * c.y, sin(c.z) * c.y);
        float lg = 1./116.*(c.x + 16.);
        vec3 xyz = vec3(wref.x*xyzR(lg + 0.002*c.y), wref.y*xyzR(lg), wref.z*xyzR(lg - 0.005*c.z));
        vec3 rgb = xyz*mat3( 3.2406, -1.5372,-0.4986, -0.9689,  1.8758, 0.0415, 0.0557,  -0.2040, 1.0570);
        return rgb;
      }
      float lerpAng(in float a, in float b, in float x) {
        float ang = mod(mod((a-b), TAU) + PI*3., TAU)-PI;
        return ang*x+b;
      }
      vec3 lerpLch(in vec3 a, in vec3 b, in float x) {
        float hue = lerpAng(a.z, b.z, x);
        return vec3(mix(b.xy, a.xy, x), hue);
      }
      const float gamma = 2.4;
      vec3 lin2srgb(vec3 c) {
        return pow(c, vec3(1.0 / gamma));
      }
      vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
        return a + b * cos(6.28318 * (c * t + d));
      }
      void main() {
        vec3 color = vec3(0, 0, 0);
        float sumDistance = 0.0;
        float distort = fNormal.z;
        for(int i = 0; i < 4; i++) {
          float currentDistance = pow(vertices[i].y - vUv.y, 2.0) + pow(vertices[i].x - vUv.x, 2.0);
          sumDistance += currentDistance;
        }
        float t = 0.0;
        for(int i = 0; i < 4; i++) {
          float currentDistance = pow(vertices[i].y - vUv.y, 2.0) + pow(vertices[i].x - vUv.x, 2.0);
          float inverseDistance = 1.0 / (currentDistance / sumDistance);
          t += inverseDistance;
        }
      vec3 brightness = vec3(0.5, 0.5, 0.5);
      vec3 contrast = vec3(0.5, 0.5, 0.5);
      vec3 oscilation = vec3(1.0, 1.0, 1.0);
      vec3 phase = vec3(0.0, 0.1, 0.2);
        for(int i = 0; i < 4; i++) {
          float currentDistance = pow(vertices[i].y - vUv.y, 2.0) + pow(vertices[i].x - vUv.x, 2.0);
          float inverseDistance = 1.0 / (currentDistance / sumDistance);
          float weight = inverseDistance / t;
          weight = smoothstep(0.0, 1.0, weight);
          color = screenBlending(color + distort / 30.0, vertices[i].color * weight);
        }
        color = lin2srgb(color);
        gl_FragColor = vec4(color.rgb, 1.0);
      }`,
    })
  }

  get texture1() {
    // @ts-ignore
    return this.uniforms.texture1.value
  }
  set texture1(v) {
    // @ts-ignore
    return (this.uniforms.texture1.value = v)
  }
}

extend({ MovingGradientMaterial })
