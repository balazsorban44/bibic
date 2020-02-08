import React, {memo} from "react"
import {useTranslation} from "react-i18next"

import Loading from "ui/Loading"
import Button from "ui/Button"
import useRoom from "hooks/data/useRoom"
import clsx from "clsx"
import {useHistory, useLocation} from "react-router"
import RoomServices from "./RoomServices"
import Text from "ui/Text"

export default memo(({onChange, roomId, adults, childrenProp: children}) => {
  const [t] = useTranslation("reservation")

  const [rooms, loading] = useRoom()

  const history = useHistory()
  const location = useLocation()
  const handleChange = id => () => {
    /*
     * Correct adults and children, if selected room
     * has less place than the currently selected
     */
    const {maxPeople} = rooms[id-1].prices.metadata
    const c = [...children]
    let a = adults
    while(a + c.length > maxPeople) c.pop()
    while(a > maxPeople) a-=1

    const searchParams = new URLSearchParams(location.search)
    searchParams.set("roomId", id)
    history.push(`${location.pathname }?${ searchParams.toString()}`)

    onChange({roomId: parseInt(id, 10), adults: a, children: c}, [])
  }

  return (
    <>
      <h4>{t("select")} {roomId ? `(${t("room-roomId", {roomNumber: roomId})})` : ""}</h4>
      {loading ? <Loading/> :
        <div className="room-picker">
          {Object.values(rooms).map(({id}) =>
            <RoomToSelect active={roomId === id} id={id} key={id} onClick={handleChange(id)}/>
          )}
        </div>
      }
      <RoomServices
        roomId={roomId}
        title={<Text component="h5">{t("room-facilities")}</Text>}
      />
    </>
  )
})

const RoomToSelect = ({id, active, onClick}) =>
  <Button
    circle
    className={clsx(
      "room-picker-room",
      {"room-active": active}
    )}
    color={`room-${id}`}
    id={`szoba-${id}`}
    key={id}
    onClick={onClick}
    type="button"
  >{id}</Button>