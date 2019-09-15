import useSubscription from "../useSubscription"

const useGallery = type => {
  const [galleries, loading] = useSubscription({ref: "galleries", initialState: {}})
  return (loading || !galleries[type]) ? [{}, true] : [galleries[type], loading]
}

export default useGallery