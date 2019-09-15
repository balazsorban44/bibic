import {useState, useEffect} from "react"


const defaultOptions = {offset: 0}


export default function useScrolled({offset}=defaultOptions) {
  const [state, setState] = useState(false)

  useEffect(() => {
    const handler = () => setState(window.scrollY > offset)

    window.addEventListener("scroll", handler, {capture: false, passive: true})

    return () => window.removeEventListener("scroll", handler, {capture: false, passive: true})

  }, [offset])

  return state
}