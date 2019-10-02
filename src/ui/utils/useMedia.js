import {useEffect, useState} from "react"

const getMediaQuery = (direction, size) =>
  `(${direction === "up" ? "max-width" : "min-width"}: ${size}px)`

const useMedia = query => {

  let queryString = query
  if (typeof query !== "string") {
    const {direction, size} = query
    queryString = getMediaQuery(direction, size)
  }

  const [matches, setMatches] = useState(window.matchMedia(queryString).matches)

  useEffect(() => {
    const matcher = () => {
      const _matches = window.matchMedia(queryString).matches
      matches !== _matches && setMatches(_matches)
    }

    window.addEventListener("resize", matcher)
    return () => window.removeEventListener("resize", matcher)
  }, [matches, queryString])

  return matches
}

export default useMedia