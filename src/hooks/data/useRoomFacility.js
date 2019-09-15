import useSubscription from "hooks/useSubscription"
import {useState, useEffect} from "react"
import objectToArray from "utils/objectToArray"
import {validators} from "utils/validate"

const useRoomFacility = roomId => {

  if (!validators({roomId}).roomId)
    throw new TypeError(`roomId (${roomId}) was invalid`)

  const [roomFacilities, setRoomFacilities] = useState([])

  const [facilities, loading] = useSubscription({ref: "roomServices", initialState: []})

  useEffect(() => {
    if (!loading)
      setRoomFacilities(
        objectToArray(facilities)
          .filter(({inRoom}) => Object.values(inRoom).includes(roomId))
      )
  }, [facilities, loading, roomId])

  return [roomFacilities, loading]
}

export default useRoomFacility