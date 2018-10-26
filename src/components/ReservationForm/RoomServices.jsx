import React from 'react'
import {withStore} from '../db'
import {Loading} from '../shared/Elements'

const RoomServices = ({roomServices, reservation: {roomId}}) =>
  <>
    <h5>a szoba szolgáltatásai</h5>
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

export default withStore(RoomServices)


