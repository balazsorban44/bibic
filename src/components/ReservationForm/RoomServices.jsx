import React, {Fragment} from 'react'
import {withStore} from '../db'
import {Loading} from '../shared/Elements'

const RoomServices = ({
  roomServices, reservation: {roomId}
}) =>
  <Fragment>
    <h5>a szoba tulajdonságai</h5>
    {roomServices ?
      <div className="room-services">
        {Object.values(roomServices).map(({
          inRoom, name, icon
        }, serviceId) => {
          const isInRoom = Object.values(inRoom).includes(parseInt(roomId, 10))
          return (
            <div
              className={`room-service ${isInRoom ? "service-in-room" : ""}`}
              key={serviceId}
            >
              <img
                alt={name}
                src={icon}
              />
              <span style={{fontSize: "1rem"}}>{name}</span>
            </div>
          )
        })}
      </div> :
      <Loading/>
    }
  </Fragment>

export default withStore(RoomServices)


