import React from 'react'
import {useStore} from 'context/db'
import {Loading} from 'components/Elements'
import {useTranslation} from 'react-i18next'
import RoomFacilities from 'pages/ReservationForm/RoomFacilities'

export const RoomSelector = ({roomId, onRoomSelect}) => {
  const {rooms} = useStore()
  const handleRoomSelect = roomId => () => onRoomSelect({roomId})

  const [t] = useTranslation()
  return (
    <>
      <h4>{t("reservation.choose-a-room")} {roomId && t("reservation.room-chosen", {id: roomId})}</h4>
      {rooms.length ?
        <div className="room-picker">
          {Object.values(rooms).map(({id}) =>
            <RoomOption
              active={roomId === id}
              id={id}
              key={id}
              onClick={handleRoomSelect(id)}
            />
          )}
        </div> :
        <Loading/>
      }
      <RoomFacilities roomId={roomId}/>
    </>
  )
}

const RoomOption = ({active, id, onClick}) => {
  return (
    <div
      className={`room-picker-room ${active ? "room-active": ""}`}
      id={`szoba-${id}`}
    >
      <span
        className="button"
        onClick={onClick}
      >
        {id}
      </span>
    </div>
  )
}

export default RoomSelector