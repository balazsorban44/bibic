import React from 'react'
import {withStore} from "./db"
import {Link} from 'react-scroll'


export const RoomMenu = ({
  rooms, isBigScreen, onClick
}) =>
  rooms.map(({id}) =>
    <li key={id}>
      <Link
        offset={isBigScreen ? -106 : -40}
        onClick={onClick}
        to={`szoba-${id}`}
      >
        {id}
      </Link>
    </li>
  )

export default withStore(RoomMenu)