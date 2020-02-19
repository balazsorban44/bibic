import React from 'react'
import {Loading} from '../shared/Elements'
import {useTranslation} from 'react-i18next'
import {useRoomFacilities} from 'context/roomFacilities'

const RoomFacilities = ({roomId}) => {
  const [t] = useTranslation()
  const {getRoomFacilities} = useRoomFacilities()

  const roomFacilities = getRoomFacilities()
  return (
    <>
      <h5>{t("reservation.room-facilities")}</h5>
      <div className="room-services">
        {roomFacilities.length
          ? roomFacilities.map(({key, inRoom, icon}) => {
            const name = t(`room-facilities.${key}`)
            const className = `room-service ${ inRoom[roomId] ? "service-in-room" : ""}`
            return (
              <div className={className} key={key}>
                <img alt={name} src={icon}/>
                <span>{name}</span>
              </div>
            )
          })
          : <Loading/>
        }
      </div>
    </>
  )
}

export default RoomFacilities


