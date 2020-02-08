import React from 'react'
import {withStore} from '../db'
import {Loading} from '../shared/Elements'
import {useTranslation} from 'react-i18next'

const RoomServices = ({roomServices, roomId}) => {
  const [t] = useTranslation()
  return (
    <>
      <h5>{t("reservation.room-facilities")}</h5>
      <div className="room-services">
        {roomServices.length ? roomServices.map(([
          key, {
            inRoom, name, icon
          }
        ]) =>
          <div
            className={`room-service ${
              Object.values(inRoom).includes(roomId) ?
                "service-in-room" :
                ""
            }`}
            key={key}
          >
            <img
              alt={name}
              src={icon}
            />
            <span>{name}</span>
          </div>
        ) : <Loading/>}
      </div>
    </>
  )
}

export default withStore(RoomServices)


