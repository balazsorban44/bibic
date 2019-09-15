import React from "react"
import {Link} from "react-scroll"

import useRoom from "hooks/data/useRoom"
import Loading from "components/Loading"

export default function RoomMenu ({mdUp, onClick, open}) {

  const [rooms, loading] = useRoom()

  return (
    <ul className={`room-menu ${open ? "room-menu-show" : ""}`}>
      {loading ? <Loading/> : rooms.map(RoomMenuItem({mdUp, onClick}))}
    </ul>
  )
}

const RoomMenuItem = ({mdUp, ...props}) => ({id}) =>
  <li key={id}>
    <Link
      {...props}
      offset={mdUp ? -106 : -40}
      to={`szoba-${id}`}
    >
      {id}
    </Link>
  </li>