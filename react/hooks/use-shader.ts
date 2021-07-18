import "whatwg-fetch"
import { useEffect, useState } from "react"

export function useShader({ publicPath }) {
  const [shader, setShader] = useState("")
  useEffect(() => {
    async function update() {
      const text = await fetch(publicPath).then((res) => res.text())
      setShader(text)
    }
    update()
  }, [publicPath])
  return shader
}
