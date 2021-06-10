import fetch from "../../web_modules/whatwg-fetch.js"

const cnoise = await fetch(`/shaders/simple/cnoise.glsl`).then((res) =>
  res.text()
)
const vertex = await fetch(`/shaders/simple/vertex.glsl`).then((res) =>
  res.text()
)

// const pnoise = await fetch(`/shaders/spheres/pnoise.glsl`).then((res) =>
//   res.text()
// )
export const vertexShader = `
${cnoise}
${vertex}
`

export const fragmentShader = await fetch(`/shaders/simple/fragment.frag`).then(
  (res) => res.text()
)
