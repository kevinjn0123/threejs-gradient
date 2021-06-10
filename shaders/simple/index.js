import fetch from "../../web_modules/whatwg-fetch.js"

const noises = await fetch(`/shaders/simple/noises.glsl`).then((res) =>
  res.text()
)
const vertex = await fetch(`/shaders/simple/vertex.glsl`).then((res) =>
  res.text()
)

// const pnoise = await fetch(`/shaders/spheres/pnoise.glsl`).then((res) =>
//   res.text()
// )
export const vertexShader = `
${noises}
${vertex}
`

export const fragmentShader = await fetch(`/shaders/simple/fragment.frag`).then(
  (res) => res.text()
)
