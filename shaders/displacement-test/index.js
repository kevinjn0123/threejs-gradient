import fetch from "../../web_modules/whatwg-fetch.js"

const noises = await fetch(`/shaders/displacement-test/noises.glsl`).then(
  (res) => res.text()
)
const vertex = await fetch(`/shaders/displacement-test/vertex.glsl`).then(
  (res) => res.text()
)

export const vertexShader = `
${noises}
${vertex}
`

export const fragmentShader = await fetch(
  `/shaders/displacement-test/fragment.frag`
).then((res) => res.text())
