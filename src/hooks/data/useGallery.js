import useSubscription from "../useSubscription"

const useGallery = type => {
  const [galleries, loading] = useSubscription({ref: "galleries", initialState: {}})
  return (loading || !galleries[type])
    ? [{}, true] :
    [galleries[type], loading]
}

export const useRoomGallery = id => {
  const [rooms, loading] = useGallery("szobak")
  return [loading ? [] : Object.values(rooms[id]), loading]
}

export default useGallery