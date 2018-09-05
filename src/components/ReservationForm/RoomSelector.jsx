import React, {Fragment} from 'react'
import {withStore} from '../db'
import {Loading} from '../shared/Elements'

const RoomSelector = ({
  rooms, reservation: {roomId},
  handleRoomChange
}) =>
  <Fragment>
    <h4>Válasszon szobát {roomId && `(${roomId}. Szoba kiválasztva)`}</h4>
    {rooms ?
      <div className="room-picker">
        {Object.keys(rooms).map(room => {
          const {id} = rooms[room]
          return (
            <div
              className={`room-picker-room ${parseInt(roomId, 10) === id ? "room-active": ""}`}
              id={`szoba-${id}`}
              key={room}
            >
              <button
                onClick={handleRoomChange}
                value={id}
              >
                {id}
              </button>
            </div>
          )
        })}
      </div> :
      <Loading/>
    }
  </Fragment>

export default withStore(RoomSelector)