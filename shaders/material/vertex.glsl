
varying vec3 vNormal;
varying float displacement;
varying vec3 vPos;
varying float vDistort;

uniform float uTime;
uniform float uSpeed;
uniform float uNoiseDensity;
uniform float uNoiseStrength;
uniform float uFrequency;

   #define STANDARD
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

  #include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif
	#include <begin_vertex>
  float t = uTime * uSpeed;
  float distortion = pnoise((normal + t) * uNoiseDensity, vec3(10.0)) * uNoiseStrength;

  // Disturb each vertex along the direction of its normal
  vec3 pos = position + (normal * distortion);

  // Create a sine wave from top to bottom of the sphere
  // To increase the amount of waves, we'll use uFrequency
//   float angle = sin(uv.y * uFrequency + t) * uNoiseStrength;
      float displacement = 0.75 * cnoise(0.43 * position * uFrequency + t);

//   pos = rotateY(pos, angle);
  pos = position + normal * displacement * uNoiseStrength;
  vPos = pos;




  //--------add displacement------------

	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz ;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
	  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);

}

