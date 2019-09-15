import React from "react"
import Fade from "react-reveal/Fade"
import {useTranslation} from "react-i18next"

import Loading from "components/Loading"
import {Room} from "./Room"

import "./main.sass"
import useRoom from "hooks/data/useRoom"

const Rooms = () => {
  const [t] = useTranslation("rooms")
  const [rooms, loading] = useRoom()

  return (
    <section id="szobak">
      <h2 data-subtitle={t("subtitle")}>{t("title")}</h2>
      <ul className="rooms">
        {loading ?
          <Loading fullPage/> :
          rooms.map(RoomItem({t}))
        }
      </ul>
    </section>
  )
}

export default Rooms

const RoomItem = ({t}) => room =>
  <Fade key={room.id}>
    <Room {...room} name={t("room", {roomNumber: room.id})} />
  </Fade>