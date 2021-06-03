import * as THREE from "https://cdn.skypack.dev/pin/three@v0.128.0-SK0zhlI7UZNd0gIQdpJa/mode=imports/optimized/three.js"
import { vertexShader, fragmentShader } from "../shaders/planes.js"

// TODO: add dat GUI or https://github.com/pmndrs/leva
const settings = {
  speed: 0.2,
  density: 1.5,
  strength: 0.5,
}

export const planeElement = function () {
//   const geometry = new THREE.PlaneGeometry(3,3,50,50)

const geometry = new THREE.BufferGeometry();

				const indices = [];

				const vertices = [];
				const normals = [];
				const colors = [];

				const size = 5;
				const segments = 50;

				const halfSize = size / 2;
				const segmentSize = size / segments;

				// generate vertices, normals and color data for a simple grid geometry

				for ( let i = 0; i <= segments; i ++ ) {

					const y = ( i * segmentSize ) - halfSize;

					for ( let j = 0; j <= segments; j ++ ) {

						const x = ( j * segmentSize ) - halfSize;

						vertices.push( x, - y, 0 );
						normals.push( 0, 0, 1 );

						const r = ( x / size ) + 0.5;
						const g = ( y / size ) + 0.5;

						colors.push( r, g, 1 );

					}

				}

				// generate indices (data for element array buffer)

				for ( let i = 0; i < segments; i ++ ) {

					for ( let j = 0; j < segments; j ++ ) {

						const a = i * ( segments + 1 ) + ( j + 1 );
						const b = i * ( segments + 1 ) + j;
						const c = ( i + 1 ) * ( segments + 1 ) + j;
						const d = ( i + 1 ) * ( segments + 1 ) + ( j + 1 );

						// generate two faces (triangles) per iteration

						indices.push( a, b, d ); // face one
						indices.push( b, c, d ); // face two

					}

				}

				//

				geometry.setIndex( indices );
				geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
				geometry.setAttribute( 'normal', new THREE.Float32BufferAttribute( normals, 3 ) );
				geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

  const material = new THREE.ShaderMaterial({
	side: THREE.DoubleSide,
    vertexShader: vertexShader(),
    fragmentShader: fragmentShader(),
    uniforms: {
      uTime: { value: 0 },
      uSpeed: { value: settings.speed },
      uNoiseDensity: { value: settings.density },
      uNoiseStrength: { value: settings.strength },
      resolution: { value: new THREE.Vector3() }
    },
    wireframe: false,

  })
  this.mesh = new THREE.Mesh(geometry, material)

  this.settings = settings
}
