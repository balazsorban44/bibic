import React, {memo} from "react"
import {useTranslation} from "react-i18next"

import Loading from "ui/Loading"
import Button from "ui/Button"
import useRoom from "hooks/data/useRoom"

export default memo(({onChange, selected, adults, childrenProp: children}) => {
  const [t] = useTranslation("reservation")

  const [rooms, loading] = useRoom()

  const handleChange = id => {
    /*
     * Correct adults and children, if selected room
     * has less place than the currently selected
     */
    const {maxPeople} = rooms[id-1].prices.metadata
    const c = [...children]
    let a = adults
    while(a + c.length > maxPeople) c.pop()
    while(a > maxPeople) a-=1

    onChange({roomId: parseInt(id, 10), adults: a, children: c}, [])
  }

  return (
    <>
      <h4>{t("select")} {selected ? `(${t("room-selected", {roomNumber: selected})})` : ""}</h4>
      {loading ? <Loading/> :
        <div className="room-picker">
          {Object.values(rooms).map(RoomToSelect({selected, handleChange}))}
        </div>
      }
    </>
  )
})

const RoomToSelect = ({selected, handleChange}) => ({id}) =>
  <Button
    children={id}
    circle
    className={`room-picker-room ${selected === id ? "room-active" : ""}`}
    color={`room-${id}`}
    id={`szoba-${id}`}
    key={id}
    onClick={() => handleChange(id)}
  />