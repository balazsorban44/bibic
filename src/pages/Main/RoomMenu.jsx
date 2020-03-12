import React from 'react'
import {useStore} from "../../context/db"
import {Link} from 'react-scroll'


export const RoomMenu = ({isBigScreen, onClick}) => {
  const {rooms} = useStore()
  return rooms.map(({id}) =>
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
}

export default RoomMenu