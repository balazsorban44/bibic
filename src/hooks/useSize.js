import {useState, useEffect} from "react"


const defaultValue = {
  width: window.innerWidth,
  height: window.innerHeight
}


export default function useSize() {
  const [size, setSize] = useState(defaultValue)

  useEffect(() => {
    const handler = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener("resize", handler)

    return () => window.removeEventListener("resize", handler)

  }, [])

  return size
}