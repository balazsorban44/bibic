import React, {Fragment} from 'react'
import {withStore} from '../db'
import {Loading} from '../shared/Elements'

const RoomSelector = ({rooms, reservation: {roomId},
  updateReservation}) =>
  <Fragment>
    <h4>Válasszon szobát {roomId && `(${roomId}. Szoba kiválasztva)`}</h4>
    {rooms.length ?
      <div className="room-picker">
        {Object.values(rooms).map(({id}) =>
          <div
            className={`room-picker-room ${
              parseInt(roomId, 10) === id ?
                "room-active":
                ""
            }`}
            id={`szoba-${id}`}
            key={id}
          >
            <span
              className="button"
              onClick={() => updateReservation("roomId", id)}
            >
              {id}
            </span>
          </div>
        )}
      </div> :
      <Loading/>
    }
  </Fragment>

export default withStore(RoomSelector)