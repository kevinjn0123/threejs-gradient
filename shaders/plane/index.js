import fetch from "../../web_modules/whatwg-fetch.js"

const cnoise = await fetch(`/shaders/plane/cnoise.glsl`).then((res) =>
  res.text()
)
const vertex = await fetch(`/shaders/plane/vertex.glsl`).then((res) =>
  res.text()
)
export const vertexShader = `
${cnoise}
${vertex}
`

export const fragmentShader = await fetch(`/shaders/plane/fragment.frag`).then(
  (res) => res.text()
)
