import fetch from "../../web_modules/whatwg-fetch.js";

const cnoise = await fetch(`/shaders/material/cnoise.glsl`).then((res) =>
  res.text()
);

const pnoise = await fetch(`/shaders/material/pnoise.glsl`).then((res) =>
  res.text()
);

const rotation = await fetch(`/shaders/material/rotation.glsl`).then((res) =>
  res.text()
);
const vertex = await fetch(`/shaders/material/vertex.glsl`).then((res) =>
  res.text()
);
export const vertexShader = `
${pnoise}
${cnoise}
${rotation}
${vertex}
`;

export const fragmentShader = await fetch(
  `/shaders/material/fragment.frag`
).then((res) => res.text());

export const cnoiseVal = `${cnoise}`;
