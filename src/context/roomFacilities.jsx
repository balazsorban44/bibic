import React, {createContext, useContext, useCallback} from 'react'
import {useData} from './useData'
import {FS} from 'lib/firebase'


const RoomFacilitiesContext = createContext()


export const useRoomFacilities = () => useContext(RoomFacilitiesContext)


const ROOM_FACILITIES_QUERY = FS
  .collection("room-facilities")


export const RoomFacilitiesProvider = ({children}) => {

  const [result, loading] = useData(ROOM_FACILITIES_QUERY)

  const getRoomFacilities = useCallback((roomId) => {
    if (roomId) {
      return result.filter(roomFacility => roomFacility.inRoom[roomId])
    }
    return result
  }, [result])

  return (
    <RoomFacilitiesContext.Provider value={{getRoomFacilities, loading}}>
      {children}
    </RoomFacilitiesContext.Provider>
  )
}