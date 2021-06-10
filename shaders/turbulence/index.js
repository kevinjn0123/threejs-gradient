import fetch from "../../web_modules/whatwg-fetch.js"

const noises = await fetch(`/shaders/turbulence/noises.glsl`).then((res) =>
  res.text()
)
const vertex = await fetch(`/shaders/turbulence/vertex.glsl`).then((res) =>
  res.text()
)

export const vertexShader = `
${noises}
${vertex}
`

export const fragmentShader = await fetch(
  `/shaders/turbulence/fragment.frag`
).then((res) => res.text())
