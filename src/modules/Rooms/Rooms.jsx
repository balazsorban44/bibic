import React from "react"
import Fade from "react-reveal/Fade"
import {useTranslation} from "react-i18next"

import Loading from "ui/Loading"
import {Room} from "./Room"

import "./main.sass"
import useRoom from "hooks/data/useRoom"
import Section from "ui/Section"
import Text from "ui/Text"

const Rooms = () => {
  const [t] = useTranslation("rooms")
  const [rooms, loading] = useRoom()

  return (
    <Section
      id="szobak"
      title={
        <Text
          data-subtitle={t("subtitle")}
          component="h2"
        >
          {t("title")}
        </Text>
      }
    >
      <ul className="rooms">
        {loading ?
          <Loading fullPage/> :
          rooms.map(RoomItem({t}))
        }
      </ul>
    </Section>
  )
}

export default Rooms

const RoomItem = ({t}) => room =>
  <Fade key={room.id}>
    <Room {...room} name={t("room", {roomNumber: room.id})} />
  </Fade>