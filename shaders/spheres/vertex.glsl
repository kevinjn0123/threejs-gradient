varying float vDistort;

uniform float uTime;
uniform float uSpeed;
uniform float uNoiseDensity;
uniform float uNoiseStrength;
uniform float uFrequency;
uniform float uAmplitude;

void main() {
  float t = uTime * uSpeed;
  float distortion = pnoise((normal + t) * uNoiseDensity, vec3(10.0)) * uNoiseStrength;

  // Disturb each vertex along the direction of its normal
  vec3 pos = position + (normal * distortion);

  // Create a sine wave from top to bottom of the sphere
  // To increase the amount of waves, we'll use uFrequency
  // To make the waves bigger we'll use uAmplitude
  float angle = sin(uv.y * uFrequency + t) * uAmplitude;
  pos = rotateY(pos, angle);

  vDistort = distortion;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}