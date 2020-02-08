import React from "react"
import {useTranslation} from "react-i18next"
import {RoomSlider} from "./RoomSlider"
import {Link} from "react-router-dom"
import Button from "ui/Button"
import Text from "ui/Text"
import RoomServices from "modules/reservation/RoomServices"

export const Room = ({id, name, description}) => {
  const [t] = useTranslation("rooms")

  return (
    <li
      className={`room szoba-${id}`}
      id={`szoba-${id}`}
    >
      <Text component="h3">{name}</Text>
      <Text className="room-description">{description}</Text>
      <RoomServices
        roomId={id}
        showCaption={false}
      />
      <Button
        className="room-reserve-btn"
        color={`room-${id}`}
        component={Link}
        fullWidth
        size="large"
        style={{justifySelf: "center"}}
        to={`foglalas?roomId=${id}`}
      >
        {t("reserve")}
      </Button>
      <RoomSlider room={id} />
    </li>
  )

}