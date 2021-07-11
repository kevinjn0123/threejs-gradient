import * as THREE from "https://cdn.skypack.dev/pin/three@v0.128.0-SK0zhlI7UZNd0gIQdpJa/mode=imports/optimized/three.js"

export const getVertices = (points) => [
  {
    x: points.point_1_x,
    y: points.point_1_y,
    color: new THREE.Color("hsl(20, 100%, 50%)"),
  },
  {
    x: points.point_2_x,
    y: points.point_2_y,
    color: new THREE.Color("hsl(40, 100%, 50%)"),
  },
  {
    x: points.point_3_x,
    y: points.point_3_y,
    color: new THREE.Color("hsl(100, 100%, 50%)"),
  },
  {
    x: points.point_4_x,
    y: points.point_4_y,
    color: new THREE.Color("hsl(70, 100%, 70%)"),
  },
]
