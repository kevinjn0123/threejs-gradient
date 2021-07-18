import fetch from "../../web_modules/whatwg-fetch.js"

// const cnoise = await fetch(`/shaders/plane/cnoise.glsl`).then((res) =>
//   res.text()
// )
const vertex = await fetch(`/shaders/noise/vert.glsl`).then((res) =>
  res.text()
)
export const vertexShader = `
${vertex}
`

export const fragmentShader = await fetch(`/shaders/noise/fragment.frag`).then(
  (res) => res.text()
)
