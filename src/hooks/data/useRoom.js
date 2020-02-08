import useSubscription from "hooks/useSubscription"

const useRoom = () => useSubscription({ref: "rooms"})

export default useRoom