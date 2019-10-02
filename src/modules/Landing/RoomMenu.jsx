import React from "react"
import {Link} from "react-scroll"

import useRoom from "hooks/data/useRoom"
import Loading from "ui/Loading"
import Button from "ui/Button"

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
    <Button
      circle
      color={`room-${id}`}
      component={Link}
      offset={mdUp ? -106 : -40}
      to={`szoba-${id}`}
      {...props}
    >
      {id}
    </Button>
  </li>