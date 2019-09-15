import useSubscription from "../useSubscription"

const useRoom = () => useSubscription({ref: "rooms", initialState: []})

export default useRoom