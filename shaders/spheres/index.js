import fetch from "../../web_modules/whatwg-fetch.js"

const pnoise = await fetch(`/shaders/spheres/pnoise.glsl`).then((res) =>
  res.text()
)
const rotation = await fetch(`/shaders/spheres/rotation.glsl`).then((res) =>
  res.text()
)
const vertex = await fetch(`/shaders/spheres/vertex.glsl`).then((res) =>
  res.text()
)
export const vertexShader = `
${pnoise}
${rotation}
${vertex}
`

export const fragmentShader = await fetch(
  `/shaders/spheres/fragmentShader.frag`
).then((res) => res.text())
