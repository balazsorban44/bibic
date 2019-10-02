declare function useMedia(queryString: string) : boolean
declare function useMedia(queryObject: {
  direction: "up" | "down",
  size: number
}) : boolean

export default useMedia