import React from "react"
import {useTranslation} from "react-i18next"
import {RoomSlider} from "./RoomSlider"
import {Link} from "react-router-dom"
import Button from "ui/Button"
import Text from "ui/Text"
import useGallery from "hooks/data/useGallery"
import Loading from "ui/Loading"
import useRoomFacility from "hooks/data/useRoomFacility"

export const Room = ({id, name, description}) => {
  const [t] = useTranslation("rooms")

  const [rooms, galleryLoading] = useGallery("szobak")
  const pictures = rooms[id]

  const [facilities, facilityLoading] = useRoomFacility(id)

  const loading = galleryLoading || facilityLoading

  return loading ? <Loading/> :

    <li
      className={`room szoba-${id}`}
      id={`szoba-${id}`}
    >
      <Text variant="h3">{name}</Text>
      {/* <h3 className="room-title" >{name}</h3> */}
      <RoomSlider pictures={Object.values(pictures)} />
      <p className="room-description" >{description}</p>
      <div className="room-services">
        {facilities
          .map(({key, name, icon}) =>
            <div
              className="room-service service-in-room"
              key={key}
              title={name}
            >
              <img alt={name} src={icon} />
            </div>
          )
        }
      </div>
      <Button
        className="room-reserve-btn"
        color={`room-${id}`}
        component={Link}
        size="large"
        style={{justifySelf: "center"}}
        to={`foglalas?roomId=${id}`}
      >
        {t("reserve")}
      </Button>
      {/* <div className="button room-reserve-btn">
      </div> */}
    </li>

}